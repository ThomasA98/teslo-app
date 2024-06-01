import Link from "next/link";
import { redirect } from "next/navigation";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { CartSummary } from "./ui/CartSummary";

export default function CartPage() {

  // if (0) redirect('/empty')

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
            <ProductsInCart />
          </div>
          {/* checkout */}
          <CartSummary />
        </div>

      </div>

    </div>
  );
}