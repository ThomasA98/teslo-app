import { Atkinson_Hyperlegible } from 'next/font/google'
import { Montserrat_Alternates } from 'next/font/google'

export const atkinson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: ['400'] })

export const titleFont = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['500', '700']
})