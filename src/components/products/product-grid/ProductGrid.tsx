import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

export interface ProductGridProps {
    products: Product[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {
            products.map(product => (
                <ProductGridItem key={ product.slug } product={ product } />
            ))
        }
    </div>
  )
}