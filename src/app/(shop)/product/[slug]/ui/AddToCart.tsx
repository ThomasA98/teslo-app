'use client'
import { useState } from "react"
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Size } from "@/interfaces"
import { useCartStore } from "@/store"

export interface AddToCartProps {
    sizes: Size[]
    product: Omit<CartProduct, 'size' | 'quantity'>
}

export const AddToCart: React.FC<AddToCartProps> = ({ sizes, product }) => {

    const addProductToCart = useCartStore(state => state.addProductToCart)
    const [ size, setSize ] = useState<Size>()
    const currentProduct = useCartStore(state => state.cart[`${ size } - ${ product.id }`])
    const [ quantity, setQuantity ] = useState(1)
    const [ posted, setPosted ] = useState(false)

    /* experimento  */
    // const {
    //     size:       [ size, setSize ],
    //     posted:     [ posted, setPosted ],
    //     quantity:   [ quantity, setQuantity ],
    // } = {
    //     size:       useState<Size>(),
    //     posted:     useState(false),
    //     quantity:   useState(1),
    // }

    const onSizeChange = (size: Size) => {
        setSize(size)
    }

    const onQuantityChange = (quantity: number) => {
        setQuantity(quantity)
    }

    const addToCart = () => {
        setPosted(true)

        if(!size) return;

        addProductToCart({
            ...product,
            size,
            quantity,
        })

        setQuantity(1)
        setPosted(false)
    }

    return (
    <>
        <SizeSelector selectedSize={ size } availableSizes={ sizes } onSizeChange={ onSizeChange } />
        <QuantitySelector quantity={ quantity } onQuantityChange={ onQuantityChange } />
        <button
            onClick={ addToCart }
            className="btn-primary"
            style={{
                backgroundColor: (currentProduct?.quantity ?? 0) >= 5 ? '#756' : undefined
            }}
        >
            {
                !currentProduct
                ? 'Agregar al carrito de compras'
                : `Llevas ${ currentProduct.quantity } en el carrito`
            }
        </button>
        { !size && posted && <span className="text-red-500">Debe de seleccionar la talla</span> }
    </>
  )
}


// export const Cart = () => {
//     const cart = useCartStore(state => state.cart)

//     return (
//         Object.entries(cart).map(([ key, product ]) => (
//             <span key={ key }>{ product.title }</span>
//         ))
//     )
// }