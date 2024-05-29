'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

const { min, max } = Math

export interface QuantitySelectorProps {
    quantity: number
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity }) => {

    const [ count, setCount ] = useState(quantity)

    const onQuantityChanged = (value: number) => {
        setCount(
            prev => min(
                max(prev + value, 0)
                , 5
            )
        )
    }

  return (
    <div className="flex gap-1">
        <button onClick={ () => onQuantityChanged(-1) }>
            <IoRemoveCircleOutline size={ 25 } />
        </button>
        <span className="w-20 px-5 bg-gray-200 text-center rounded">
            { count }
        </span>
        <button onClick={ () => onQuantityChanged(+1) }>
            <IoAddCircleOutline size={ 25 } />
        </button>
    </div>
  )
}