'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"

export const CartSummary = () => {

    const { subtotal, taxes, total, totalProducts } = useCartStore(store => store.getSummaryInformation())
    if (totalProducts < 1) location.href = '/empty';
    const [ loaded, setLoaded ] = useState(false)

    useEffect(
        () => {
            setLoaded(true)
        },
        []
    )

    return (
        <div className="bg-white rounded-xl shadow-xl p-8 h-fit">
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
            <div className="pt-4">
                <Link
                    href={'/checkout/address'}
                    className="flex btn-primary justify-center w-full"
                >
                    Checkout
                </Link>
            </div>
        </div>
    )
}