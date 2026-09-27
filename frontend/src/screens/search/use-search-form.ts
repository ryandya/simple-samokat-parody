import { useForm } from "react-hook-form"
import { useDebounce } from '@/hooks/use-debounce'

export interface ISearchFormData {
    searchTerm: string
}

export const useSearchForm = () => {
    const { control, watch } = useForm<ISearchFormData>({
        mode: 'onChange',
        defaultValues: {
            searchTerm: ''
        }
    })

    const searchTerm = watch('searchTerm')
    const debounceSearch = useDebounce(searchTerm, 500)

    return { debounceSearch, searchTerm, control }
}
