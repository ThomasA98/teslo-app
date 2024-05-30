export const revalidate = 604_800

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideShow } from "@/components/product/slideshow/ProductMobileSlideShow";
import { getProductBySlug } from "@/actions";
import { ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { Metadata, ResolvingMetadata } from "next";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile */}
        <ProductMobileSlideShow images={ product.images } title={ product.title } className="md:hidden" />
        {/* descktop */}
        <ProductSlideShow images={ product.images } title={ product.title } className="hidden md:block" />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-3 col-span-1 p-3">
        <StockLabel slug={ product.slug } />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg">${ product.price }</p>
        {/* selector de tallas */}
        <SizeSelector selectedSize="M" availableSizes={ product.sizes } />
        {/* selector de cantidad */}
        <QuantitySelector quantity={ 2 } />
        <button className="btn-primary">
          Agregar al carrito de compras
        </button>
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>
      </div>
    </div>
  );
}