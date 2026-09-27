import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Prisma } from '@prisma/client';
import { returnUserObject } from './return-user.object.js';
import { returnProductObj } from '../product/return-product.object.js';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getById(id: string, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                ...returnUserObject,
                favourites: {
                    select: {
                        ...returnProductObj
                    }
                },
                ...selectObject
            }
        })

        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    async toggleFavourite(userId: string, productId: string) {
        const user = await this.getById(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isExists = user.favourites.some(product => product.id === productId)

        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                favourites: {
                    [isExists ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        })
        return { message: 'Product added to fav.' }
    }
}
