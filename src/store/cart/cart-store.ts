import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartProduct } from "@/interfaces"

export interface UseCartState {
    cart: { [key: string]: CartProduct }
    addProductToCart: (product: CartProduct) => void
    updateQuantity: (product: CartProduct, quantity: number) => void
    getTotalItems: () => number
    getSummaryInformation: () => { totalProducts: number, subtotal: number, taxes: number, total: number }
    removeProductToCart: (product: CartProduct) => void
    clearCart: () => void
}

export const useCartStore = create<UseCartState>()(
    persist(
        (set, get) => ({
            cart: {},
            addProductToCart: (product) => {
                set({ cart: { ...get().cart, [`${ product.size } - ${ product.id }`]: product } })
            },
            updateQuantity: (product, quantity) => {
                set({ cart: { ...get().cart, [`${ product.size } - ${ product.id }`]: { ...product, quantity } } })
            },
            getTotalItems: () => {
                return Object.values(get().cart).reduce((acc, { quantity }) => acc + quantity, 0)
            },
            removeProductToCart: (product: CartProduct) => {
                const cart = get().cart
                delete cart[`${ product.size } - ${ product.id }`]

                set({ cart: { ...cart } })
            },
            getSummaryInformation: () => {
                const { cart } = get()

                return Object.values(cart).reduce(
                    (acc, { quantity, price }) => {

                        const subtotal = acc.subtotal + (quantity * price)
                        const taxes = (subtotal + (quantity * price)) * 0.15

                        return {
                            totalProducts: acc.totalProducts + quantity,
                            total: subtotal * 1.15,
                            subtotal,
                            taxes,
                        }
                    },
                    {
                        totalProducts: 0,
                        subtotal: 0,
                        taxes: 0,
                        total: 0,
                    }
                )
            },
            clearCart: () => {
                set({ cart: {} })
            }
        }), {
            name: 'shopping-cart'
        }
    )
)