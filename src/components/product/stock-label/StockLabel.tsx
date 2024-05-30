'use client'

import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import clsx from "clsx"
import { useEffect, useState } from "react"

export interface StockLabelProps {
    slug: string
}

export const StockLabel: React.FC<StockLabelProps> = ({ slug }) => {

    const [ stock, setStock ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(
        () => {
            getStock()
        },
        []
    )

    const getStock = async () => {
        const stock = await getStockBySlug(slug)
        setStock(stock)
        setIsLoading(false)
    }

  return (
    <>
    <h1 className={clsx(
        `${titleFont.className} antialiased font-bold text-xl rounded`,
        {
            'bg-gray-300 animate-pulse text-transparent': isLoading,
            'fade-in': !isLoading,
        }
    )}>
        Stock: { stock }
    </h1>
    </>
  )
}