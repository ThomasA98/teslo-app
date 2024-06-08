'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/store"
import { ProductImage, QuantitySelector } from "@/components"

export const ProductsInCart = () => {

    const productsInCart = useCartStore(state => state.cart)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const removeProductToCart = useCartStore(state => state.removeProductToCart)
    const [ loaded, setLoaded ] = useState(false)

    useEffect(
        () => {
            setLoaded(true)
        },
        []
    )

  return (
    <>{
        loaded && Object.entries(productsInCart).map(([key, product]) => (
          <div key={key} className="flex gap-2">
            <ProductImage
              src={ product.image }
              alt={ product.title }
              width={ 100 }
              height={ 100 }
              style={{
                width: '100px',
                height: '100px',
              }}
              className="rounded"
            />
            <div>
                <Link href={`/product/${ product.slug }`} className="hover:underline cursor-pointer">
                    <p>{ product.size } - { product.title }</p>
                </Link>
                <p>${ product.price }</p>
              <QuantitySelector quantity={ product.quantity } onQuantityChange={ value => updateQuantity(product, value) } />
              <button className="underline" onClick={ () => removeProductToCart(product) }>Remover</button>
            </div>
          </div>
        ))
      }</>
  )
}