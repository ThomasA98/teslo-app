import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import clsx from "clsx";
import { getOrderById } from "@/actions";
import { PayPalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string
  }
}

export default async function OrderByIdPage({ params }: Props) {

  const { id } = params

  const { order, ok } = await getOrderById(id)

  if (!ok) {
    notFound()
  }

  const { OrderAddress, OrderItem, isPaid, subTotal, total, tax, itemsInOrder } = order!

  return (
    <div className="flex justify-center items-center px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col gap-4">
            <div className={clsx(
              'flex items-center rounded-lg text-xs font-bold text-white px-2 py-2 gap-2',
              {
                'bg-green-700': isPaid,
                'bg-red-500': !isPaid,
              }
            )}>
              <IoCartOutline size={25} />
              {
                isPaid
                  ? <span>Pagada</span>
                  : <span>Pendiente de pago</span>
              }
            </div>
            {
              OrderItem?.map(({ price, quantity, size, product: { productImages, title, slug } }) => (
                <div key={`${size}-${slug}`} className="flex gap-2">
                  <Image
                    src={`/products/${productImages[0].url}`}
                    alt={title}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                    className="rounded"
                  />
                  <div>
                    <p>{title}</p>
                    <p>${price} x {quantity}</p>
                    <p className="font-bold">Subtotal: ${price * quantity}</p>
                  </div>
                </div>
              ))
            }
          </div>
          {/* checkout */}
          <div className="flex flex-col gap-4 bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl">Direccion de entrega</h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl capitalize">{OrderAddress?.firstName} {OrderAddress?.lastName}</p>
              <p className="capitalize">{OrderAddress?.address}</p>
              <p className="capitalize">{OrderAddress?.address2}</p>
              <p className="capitalize">{OrderAddress?.postalCode}</p>
              <p className="capitalize">{OrderAddress?.city}, {OrderAddress?.country.name}</p>
              <p className="capitalize">{OrderAddress?.phone}</p>
            </div>

            <hr />

            <h2 className="text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <span>No. Productos</span>
              <span className="text-right">{itemsInOrder} articulos</span>
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(subTotal!)}</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(tax!)}</span>
              <hr />
              <hr />
              <span className="text-2xl">Total</span>
              <span className="text-2xl text-right">{currencyFormat(total!)}</span>
            </div>
            {
              order?.isPaid
                ? (
                  <div className="flex items-center bg-green-700 rounded-lg text-xs font-bold text-white px-2 py-2 gap-2">
                    <IoCartOutline size={25} />
                    <span>Pagada</span>
                  </div>
                )
                : (
                  <PayPalButton
                    amount={order?.total!}
                    orderId={id}
                  />
                )
            }
          </div>
        </div>

      </div>

    </div>
  );
}