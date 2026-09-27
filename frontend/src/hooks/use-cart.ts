import { useTypedSelector } from './use-typed-selector'

export const useCart = () => {
    const items = useTypedSelector(state => state.cart.items)

    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )

    return { items, totalPrice }
}
