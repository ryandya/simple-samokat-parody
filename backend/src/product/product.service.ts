import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ProductDTO } from './dto/product.dto.js';
import { generateSlug } from '../utils/generate-slug.js';
import { returnProductObj } from './return-product.object.js';
import { CategoryService } from '../category/category.service.js';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService) { }

    async getAll(searchTerm?: string) {
        if (searchTerm) return this.search(searchTerm)

        return this.prisma.product.findMany({
            select: returnProductObj,
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async search(searchTerm: string) {
        return this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: returnProductObj
        })
    }

    async getBySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: returnProductObj
        })
        if (!product) {
            throw new Error('Product not found')
        }
        return product
    }

    async getByCategory(categorySlug: string) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: returnProductObj
        })
        if (!products) {
            throw new Error('Products not found')
        }
        return products
    }

    async create(dto: ProductDTO) {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                slug: generateSlug(dto.name),
                image: dto.image,
                description: dto.description,
                price: dto.price,
                categoryId: dto.categoryId
            }
        })
    }

    async update(id: string, dto: ProductDTO) {
        const { categoryId, description, image, name, price } = dto

        await this.categoryService.getById(categoryId)

        return this.prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image,
                price,
                slug: generateSlug(name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
    }

    async delete(id: string) {
        return this.prisma.product.delete({
            where: {
                id
            }
        })
    }
}
