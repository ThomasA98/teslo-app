export const revalidate = 60

import { Gender } from "@prisma/client"
import { notFound } from "next/navigation"
import { getPaginatedProductsWithImages } from "@/actions"
import { Pagination, ProductGrid, Title } from "@/components"

interface Props {
  params: {
    gender: Gender
  }
  searchParams: {
    page?: string
  }
}

const validCategories: Gender[] = [
  'men',
  'women',
  'kid',
  'unisex',
]

export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  if (!validCategories.includes(gender)) notFound()

    const { products, totalPages } = await getPaginatedProductsWithImages({ genders: [ gender ], page })

  return (
    <div>
      <Title
        title={ `Category ${ gender }` }
      />
      <br />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}