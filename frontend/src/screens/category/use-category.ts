import { useTypedRoute } from "@/hooks"
import { CategoryService } from "@/services/category.service"
import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useCategory = () => {
    const { params } = useTypedRoute<'Category'>()

    const { isLoading: isCategoryLoading, data: category } = useQuery({
        queryKey: ['get category by slug', params.slug],
        queryFn: () => CategoryService.getBySlug(params.slug)
    })

    const categoryId = category?.id || ''

    const { isLoading: isProductLoading, data: products } = useQuery({
        queryKey: ['get product by category', params.slug],
        queryFn: () => ProductService.getByCategories(params.slug),
        enabled: !!categoryId
    })

    return { category, products, isLoading: isCategoryLoading || isProductLoading }
} 