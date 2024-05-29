import { ProductGrid, Title } from "@/components"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

const validCategories = [
  'men',
  'women',
  'kid',
]

export default function CategoryPage({ params }: Props) {

  const { id } = params

  if (!validCategories.includes(id)) notFound()

    const products = initialData.products.filter(({ gender }) => gender === id )

  return (
    <div>
      <Title
        title={ `Category ${ id }` }
      />
      <br />
      <ProductGrid products={ products } />
    </div>
  );
}