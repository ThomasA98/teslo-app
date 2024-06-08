'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                productImages: {
                    select: { url: true, id: true }
                }
            }
        })

        if (!product) return null

        return {
            ...product,
            images: product.productImages.map(({ url }) => url)
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener producto por el slug')
    }
}