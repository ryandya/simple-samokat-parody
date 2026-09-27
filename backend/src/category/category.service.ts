import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { returnCategoryObj } from './return-category.object.js';
import { CategoryDTO } from './dto/categort.dto.js';
import { generateSlug } from '../utils/generate-slug.js';

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.category.findMany({
            select: returnCategoryObj
        })
    }

    async getById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObj
        })
        if (!category) {
            throw new Error('Category not found')
        }
        return category
    }

    async getBySlug(slug: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObj
        })
        if (!category) {
            throw new Error('Category not found')
        }
        return category
    }

    async create(dto: CategoryDTO) {
        return this.prisma.category.create({
            data: {
                name: dto.name,
                slug: generateSlug(dto.name),
                image: dto.image,
            }
        })
    }

    async update(id: string, dto: CategoryDTO) {
        return this.prisma.category.update({
            where: {
                id
            },
            data: {
                name: dto.name,
                slug: generateSlug(dto.name),
                image: dto.image,
            }
        })
    }

    async delete(id: string) {
        return this.prisma.category.delete({
            where: {
                id
            }
        })
    }
}   
