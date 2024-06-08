import Image from "next/image"

export interface ProductImageProps {
    src?: string
    alt: string
    width: number
    height: number
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
}

export const ProductImage: React.FC<ProductImageProps> = ({ alt, height, width, className, src, style }) => {

    const localSrc = src
        ? src.startsWith('http') ? src
        : `/products/${ src }`
        : '/imgs/placeholder.jpg'

    return (
    <Image
        src={ localSrc }
        alt={ alt }
        width={ width }
        height={ height }
        className={ className }
        style={ style }
    />
  )
}