import { Size } from "@/interfaces"
import clsx from "clsx"

export interface SizeSelectorProps {
    selectedSize?: Size
    availableSizes: Size[]
    onSizeChange: (size: Size) => void
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ availableSizes, selectedSize, onSizeChange }) => {
  return (
    <div>
        <h3 className="font-bold">Tallas disponibles</h3>
        <div className="flex gap-3">
            {
                availableSizes.map(size => (
                    <button
                        key={ size }
                        onClick={ () => onSizeChange(size) }
                        className={clsx(
                            'hover:underline text-lg',
                            {
                                'underline': size === selectedSize
                            }
                        )}
                    >
                        { size }
                    </button>
                ))
            }
        </div>
    </div>
  )
}