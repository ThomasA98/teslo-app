'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ProductsInCart = () => {

    const productsInCart = useCartStore(state => state.cart)
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
            <Image
              src={`/products/${ product.image }`}
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
                <span>
                    <p>{ product.size } - { product.title } ({ product.quantity })</p>
                </span>
                <p className="font-bold">{ currencyFormat(product.price * product.quantity) }</p>
            </div>
          </div>
        ))
      }</>
  )
}