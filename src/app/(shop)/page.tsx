export const revalidate = 60

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page })

  if (products.length < 1) redirect('/')

  return (
    <div>
     <Title title="Tienda" subtitle="Todos los productos" />

     <ProductGrid products={ products } />

     <Pagination totalPages={ totalPages } />
    </div>
  );
}
