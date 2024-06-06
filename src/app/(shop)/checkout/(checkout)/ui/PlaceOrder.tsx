'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { useAddressStore, useCartStore } from "@/store"
import { placeOrder } from "@/actions"
import { currencyFormat } from "@/utils"

export const PlaceOrder = () => {

    const router = useRouter()
    const [ loaded, setLoaded ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ isPlacingOrder, setIsPlacingOrder ] = useState(false)
    const { subtotal, taxes, total, totalProducts } = useCartStore(store => store.getSummaryInformation())
    const clearCart = useCartStore(store => store.clearCart)
    const cart = useCartStore(store => store.cart)
    const address = useAddressStore(state => state.address)

    useEffect(
        () => {
            setLoaded(true)
        },
        []
    )

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)

        const productToOrder = Object.values(cart).map(({ id, quantity, size }) => ({
            productId: id,
            quantity,
            size,
        }))

        const resp = await placeOrder({
            address,
            productToOrder,
        })

        if (!resp.ok) {
            setErrorMessage(errorMessage)
            setIsPlacingOrder(false)
            return
        }

        clearCart()
        router.replace(`/orders/${resp.order?.id}`)

    }

    if (!loaded) return <div>Cargando...</div>

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl">Direccion de entrega</h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl">{ address.firstName } { address.lastName }</p>
              <p>{ address.address }</p>
              <p>{ address.address2 }</p>
              <p>{ address.postalCode }</p>
              <p>{ address.city }, { address.country }</p>
              <p>{ address.phone }</p>
            </div>

            <hr />

            <h2 className="text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2 gap-2 pt-2">
                <span>No. Productos</span>
                <span className={clsx(
                    'text-right rounded',
                    {
                        'bg-gray-300 animate-pulse text-transparent': !loaded,
                        'fade-in': loaded,
                    }
                )}>
                    { loaded && totalProducts } articulos
                </span>
                <span>Subtotal</span>
                <span className={clsx(
                    'text-right rounded',
                    {
                        'bg-gray-300 animate-pulse text-transparent': !loaded,
                        'fade-in': loaded,
                    }
                )}>
                    { loaded && currencyFormat(subtotal) }
                </span>
                <span>Impuestos (15%)</span>
                <span className={clsx(
                    'text-right rounded',
                    {
                        'bg-gray-300 animate-pulse text-transparent': !loaded,
                        'fade-in': loaded,
                    }
                )}>
                    { loaded && currencyFormat(taxes) }
                </span>
                <hr />
                <hr />
                <span className="text-2xl">Total</span>
                <span className={clsx(
                    'text-2xl text-right rounded',
                    {
                        'bg-gray-300 animate-pulse text-transparent': !loaded,
                        'fade-in': loaded,
                    }
                )}>
                    { loaded && currencyFormat(total) }
                </span>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <span className="text-sm">
                  Al hacer click en &ldquo;colocar&ldquo;, aceptas nuestros <a href="#" className="underline">términos y servicios</a> y <a href="#" className="underline">politicas de privacidad</a>
                </span>
              </p>
              <span className="text-red-500">{ errorMessage }</span>
              <button
                // href={ '/orders/123' }
                onClick={ onPlaceOrder }
                className={clsx(
                    "flex justify-center w-full",
                    {
                        'btn-primary': !isPlacingOrder,
                        'btn-disabled': isPlacingOrder,
                    }
                )}
              >
                Colocar orden
              </button>
            </div>
          </div>
  )
}