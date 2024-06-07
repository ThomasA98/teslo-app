'use server'
import { Title } from "@/components";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default async function EmptyCartPage() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-[50vh] px-10 sm:px-0 gap-4">

      <IoCartOutline size={ 80 } />
      <div className="flex flex-col gap-4 text-center">
        <Title title="Tu carrito esta vacio" className="text-2xl" />

        <Link href={'/'} className="text-blue-500 text-4xl">
          Regresar
        </Link>
      </div>
    </div>
  );
}