import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { TopMenuCloseButton } from "./TopMenuCloseButton"

export const TopMenu = () => {
  return (
    <nav className="flex px-5 h-16 justify-between items-center p-2 shadow shadow-slate-400 rounded-lg">
        <div>
            <Link href="/" >
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

        <div className="hidden sm:flex gap-2">
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/category/men">Hombres</Link>
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/category/women">Mujeres</Link>
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/category/kid">Niños</Link>
        </div>

        <div className="flex items-center gap-2">
            <Link href="/search" className="p-2 rounded-md transition-all hover:bg-gray-200">
                <IoSearchOutline size={25} />
            </Link>
            <Link href="/cart" className="p-2 rounded-md transition-all hover:bg-gray-200">
                <div className="relative">
                    <span className="absolute -top-1 -left-1 rounded-full w-4 h-4 bg-blue-300 text-xs text-blue-950 text-center">3</span>
                    <IoCartOutline size={25} />
                </div>
            </Link>

            <TopMenuCloseButton />

        </div>

    </nav>
  )
}