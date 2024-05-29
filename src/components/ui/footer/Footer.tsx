import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-sm gap-4 py-4 shadow shadow-slate-500 rounded-lg bg-white">

            <Link
                href={'/'}
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
                <span>| Shop</span>
                <span>&copy; {new Date().getFullYear()}</span>
            </Link>

            <Link
                href={'#'}
                className="underline text-slate-500"
            >
                Privacidad y Legal
            </Link>

            <Link
                href={'#'}
                className="underline text-slate-500"
            >
                Ubicaciones
            </Link>

        </div>
    )
}