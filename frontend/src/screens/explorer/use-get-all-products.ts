import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAllProducts = () => {
    const query = useQuery({
        queryKey: ['get all products'],
        queryFn: () => ProductService.getAll(),
        select: data => data,
    })

    return {
        products: query.data ?? [],
        isLoading: query.isLoading,
    }
}