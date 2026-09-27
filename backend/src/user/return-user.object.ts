import { Prisma } from "@prisma/client"

export const returnUserObject: Prisma.UserSelect = {
    id: true,
    avatarPath: true,
    email: true,
    name: true,
    phone: true,
    password: true,
}