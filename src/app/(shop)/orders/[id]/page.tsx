import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderByIdPage({ params }: Props) {

  const { id } = params

  // todo: verificar

  return (
    <div className="flex justify-center items-center px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${ id }`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col gap-4">
            <div className={clsx(
              'flex items-center rounded-lg text-xs font-bold text-white px-2 py-2 gap-2',
              {
                'bg-green-700': true,
                'bg-red-500': false,
              }
            )}>
                <IoCartOutline size={ 25 } />
                <span>Pendiente de pago</span>
                <span>Pagada</span>
            </div>
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
                    <p>${ product.price } x { 3 }</p>
                    <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                  </div>
                </div>
              ))
            }
          </div>
          {/* checkout */}
          <div className="flex flex-col gap-4 bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl">Direccion de entrega</h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Thomas Andres</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>Ciudad de Mexico</p>
              <p>CP 123123</p>
              <p>123.123.123</p>
            </div>

            <hr />

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
            <div className="flex flex-col gap-2">
              <div className={clsx(
                'flex items-center rounded-lg text-xs font-bold text-white px-2 py-2 gap-2',
                {
                  'bg-green-700': true,
                  'bg-red-500': false,
                }
              )}>
                  <IoCartOutline size={ 25 } />
                  <span>Pendiente de pago</span>
                  <span>Pagada</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}