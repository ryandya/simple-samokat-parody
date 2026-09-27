import { getProductsUrl } from "@/config/api.config"
import { request } from "./api/request.api"
import { IProduct } from "@/types/product.interface"


export const ProductService = {
    async getAll(searchTerm?: string) {
        return request<IProduct[]>({
            url: getProductsUrl(''),
            method: 'GET',
            params: searchTerm ? {
                searchTerm
            } : {}
        })
    },
    async getBySlug(slug: string) {
        return request<IProduct>({
            url: getProductsUrl(`/by-slug/${slug}`),
            method: 'GET'
        })
    },
    async getByCategories(categorySlug: string) {
        return request<IProduct[]>({
            url: getProductsUrl(`/by-category/${categorySlug}`),
            method: 'GET'
        })
    },
}
