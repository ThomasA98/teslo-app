'use server'

import prisma from "@/lib/prisma"

export const getCategories = async () => {

    try {
        const categories = await prisma.category.findMany()

        return {
            ok: true,
            categories,
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo cargar las categorias',
        }
    }

}