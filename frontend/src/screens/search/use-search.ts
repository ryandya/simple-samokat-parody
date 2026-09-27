import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchForm } from './use-search-form'

export const useSearch = () => {
    const { control, debounceSearch, searchTerm } = useSearchForm()

    const query = useQuery({
        queryKey: ['search products', debounceSearch],
        queryFn: () => ProductService.getAll(debounceSearch),
        enabled: !!debounceSearch
    })

    // console.log('query:', {
    //     products: query.data,
    // })

    return {
        products: query.data ?? [],
        isLoading: query.isLoading,
        control, searchTerm
    }
}
