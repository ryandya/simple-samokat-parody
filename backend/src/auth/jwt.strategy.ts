import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service.js";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { User } from "@prisma/client";

type JwtPayload = {
    id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        })
    }

    async validate({ id }: JwtPayload): Promise<Pick<User, 'id'>> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        return user
    }
}