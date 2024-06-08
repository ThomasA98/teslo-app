import { redirect } from "next/navigation";
import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = params

    const [ product, { ok, categories } ] = await Promise.all([
        getProductBySlug(slug),
        getCategories(),
    ])

    if (!product && slug !== 'new' || !ok) redirect('/admin/products')

  return (
    <>
      <Title title={ product?.title ?? 'New product' } />
      <ProductForm product={ product ?? {} } categories={ categories ?? [] } />
    </>
  );
}