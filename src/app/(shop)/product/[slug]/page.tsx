import { ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { ProductMobileSlideShow } from "@/components/product/slideshow/ProductMobileSlideShow";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

export interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {

  const product = initialData.products.find(({ slug }) => slug === params.slug )

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