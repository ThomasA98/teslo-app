import Link from "next/link"
import {  IoSearchOutline } from "react-icons/io5"
import { titleFont } from "@/config/fonts"
import { TopMenuCloseButton } from "./TopMenuCloseButton"
import { TopMenuCartButton } from "./TopMenuCartButton"

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
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/gender/men">Hombres</Link>
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/gender/women">Mujeres</Link>
            <Link className="p-2 rounded-md transition-all hover:bg-gray-200" href="/gender/kid">Niños</Link>
        </div>

        <div className="flex items-center gap-2">
            <Link href="/search" className="p-2 rounded-md transition-all hover:bg-gray-200">
                <IoSearchOutline size={25} />
            </Link>
            <TopMenuCartButton />
            <TopMenuCloseButton />

        </div>

    </nav>
  )
}