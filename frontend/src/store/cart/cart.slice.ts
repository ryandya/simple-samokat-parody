import { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from "./cart.types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICartInitialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
            const isExists = state.items.some(item => item.product.id === action.payload.product.id)

            if (!isExists) state.items.push({ ...action.payload, id: state.items.length.toString() })
        },
        removeFromCart: (state, acion: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter(
                item => item.id !== acion.payload.id
            )
        },

        changeQuantity: (
            state, acion: PayloadAction<IChangeQuantityPayload>) => {
            const { id, type } = acion.payload
            const item = state.items.find(item => item.id === id)

            if (item) type === 'plus' ? item.quantity++ : item.quantity--
        },

        reset: state => {
            state.items
        }
    }
})