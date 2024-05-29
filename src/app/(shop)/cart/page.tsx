import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {

  if (productsInCart.length < 1) redirect('/empty')

  return (
    <div className="flex justify-center items-center px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito de compras" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col gap-4">
            <span className="text-xl">Agregar más items</span>
            <Link
              href={'/'}
              className="underline"
            >
              Continúa comprando
            </Link>
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex gap-2">
                  <Image
                    src={`/products/${ product.images[0] }`}
                    alt={ product.title }
                    width={ 100 }
                    height={ 100 }
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                    className="rounded"
                  />
                  <div>
                    <p>{ product.title }</p>
                    <p>${ product.price }</p>
                    <QuantitySelector quantity={ 3 } />
                    <button className="underline">Remover</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-8 h-fit">
            <h2 className="text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <span>No. Productos</span>
              <span className="text-right">{ 3 } articulos</span>
              <span>Subtotal</span>
              <span className="text-right">${ 100 }</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">${ 15 }</span>
              <hr />
              <hr />
              <span className="text-2xl">Total</span>
              <span className="text-2xl text-right">${ 115 }</span>
            </div>
            <div className="pt-4">
              <Link
                href={ '/checkout/address' }
                className="flex btn-primary justify-center w-full"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}