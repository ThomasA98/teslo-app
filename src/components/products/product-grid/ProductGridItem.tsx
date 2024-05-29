import { Product } from "@/interfaces"
import Link from "next/link"
import { ProductGridItemImage } from "./ProductGridItemImage"

export interface ProductGridItemProps {
    product: Product
}

export const ProductGridItem: React.FC<ProductGridItemProps> = ({ product }) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link href={ `/product/${ product.slug }` }>
            <ProductGridItemImage
                initialImage={ product.images[0] }
                secondaryImage={ product.images[1] }
                alt={ product.title }
            />
        </Link>
        <div className="p-4 flex flex-col">
            <Link href={ `/product/${ product.slug }` } className="hover:text-blue-600" >{ product.title }</Link>
            <span className="font-bold">{ product.price }</span>
        </div>
    </div>
  )
}