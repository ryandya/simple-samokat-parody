import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma.service.js';
import { AuthDTO } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService) { }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken)
        if (!result) throw new UnauthorizedException('Invalid refresh token')

        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id
            }
        })
        if (!user) throw new NotFoundException('User not found')
        return this.AuthResponse(user)
    }

    async login(dto: AuthDTO) {
        const user = await this.validateUser(dto)
        return this.AuthResponse(user)
    }

    async register(dto: AuthDTO) {
        const oldUser = await this.findUser(dto.email)
        if (oldUser) throw new BadRequestException('Пользователь уже существует')

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: faker.person.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number(),
                password: await hash(dto.password)
            }
        })
        return this.AuthResponse(user)
    }

    private async issueTokens(userId: string) {
        const data = { id: userId }

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return { accessToken, refreshToken }
    }

    private async AuthResponse(user: User) {
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email
        }
    }

    private async findUser(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    private async validateUser(dto: AuthDTO) {
        const user = await this.findUser(dto.email)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isValid = await verify(user.password, dto.password)

        if (!isValid) {
            throw new UnauthorizedException('Invalid password')
        }

        return user
    }

}
