'use client'
import Image from "next/image"
import { useState } from "react"

export interface ProductGridItemImageProps {
    initialImage: string
    secondaryImage?: string
    alt: string
}

export const ProductGridItemImage: React.FC<ProductGridItemImageProps> = ({ alt, initialImage, secondaryImage }) => {

    const [displayImage, setDisplayImage] = useState(initialImage)

    const toggleImage = () => {
        if ( !secondaryImage ) return
        setDisplayImage(prev => prev === initialImage ? secondaryImage! : initialImage)
    }

    return (
        <Image
            src={`/products/${displayImage}`}
            alt={alt}
            onMouseEnter={ toggleImage }
            onMouseLeave={ toggleImage }
            className="w-full object-cover aspect-square rounded"
            width={500}
            height={500}
        />
    )
}