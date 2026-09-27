import { CategoryService } from "@/services/category.service"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['get categories'],
        queryFn: () => CategoryService.getAll(),
        select: data => data
    })

    return { categories, isLoading }
}