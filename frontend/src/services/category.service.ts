import { getByCategoriesUrl } from "@/config/api.config"
import { request } from "./api/request.api"
import { ICategory } from '@/types/category.interface'

export const CategoryService = {
    async getAll() {
        return request<ICategory[]>({
            url: getByCategoriesUrl(''),
            method: 'GET'
        })
    },
    async getBySlug(slug: string) {
        return request<ICategory>({
            url: getByCategoriesUrl(`/by-slug/${slug}`),
            method: 'GET'
        })
    },
}
