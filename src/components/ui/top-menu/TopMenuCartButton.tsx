'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { IoCartOutline } from "react-icons/io5"
import { useCartStore } from "@/store"

export const TopMenuCartButton = () => {

    const totalItems = useCartStore(store => store.getTotalItems())

    const [ loaded, setLoaded ] = useState(false)

    useEffect(
        () => {
            setLoaded(true)
        }
    , [])

    return (
        <Link href={ (loaded && totalItems < 1) ? '/empty' : '/cart' } className="p-2 rounded-md transition-all hover:bg-gray-200">
            <div className="relative">
                {
                    loaded && totalItems > 0 && (
                        <span className="fade-in absolute -top-1 -left-1 rounded-full w-4 h-4 bg-blue-300 text-xs text-blue-950 text-center">
                            { totalItems }
                        </span>
                    )
                }
                <IoCartOutline size={25} />
            </div>
        </Link>
    )
}