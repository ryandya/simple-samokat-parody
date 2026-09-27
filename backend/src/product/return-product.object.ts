import { Prisma } from "@prisma/client";
import { returnCategoryObj } from "../category/return-category.object.js";

export const returnProductObj: Prisma.ProductSelect = {
    id: true,
    name: true,
    description: true,
    price: true,
    image: true,
    createdAt: true,
    slug: true,
    category: {select: returnCategoryObj}
}
