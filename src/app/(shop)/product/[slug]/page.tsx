export const revalidate = 604_800

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";
import { ProductSlideShow, StockLabel, ProductMobileSlideShow } from "@/components";
import { AddToCart } from "./ui/AddToCart";

export interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {

  const slug = params.slug

  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${ product?.images[1] }`]
    }
  }

}

export default async function ProductPage({ params }: Props) {

  const product = await getProductBySlug(params.slug)

  if (!product) notFound()

    const { images, title, slug, id, price, description, sizes } = product

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile */}
        <ProductMobileSlideShow images={ images } title={ title } className="md:hidden" />
        {/* descktop */}
        <ProductSlideShow images={ images } title={ title } className="hidden md:block" />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-3 col-span-1 p-3">
        <StockLabel slug={ slug } />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          { title }
        </h1>
        <p className="text-lg">${ price }</p>
        {/* selector de tallas */}
        <AddToCart sizes={ sizes } product={{
          id,
          slug,
          title,
          price,
          image: images[0],
        }} />
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { description }
        </p>
      </div>
    </div>
  );
}