import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

const { min, max } = Math

export interface QuantitySelectorProps {
    quantity: number
    onQuantityChange: (value: number) => void
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {

    const onChange = (value: number) => {
        const newQuantity = min(
            max(quantity + value, 1)
            , 5
        )
        onQuantityChange(newQuantity)
    }

  return (
    <div className="flex gap-1">
        <button onClick={ () => onChange(-1) }>
            <IoRemoveCircleOutline size={ 25 } />
        </button>
        <span className="w-20 px-5 bg-gray-200 text-center rounded">
            { quantity }
        </span>
        <button onClick={ () => onChange(+1) }>
            <IoAddCircleOutline size={ 25 } />
        </button>
    </div>
  )
}