'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"

export const getOrdersByUser = async () => {
    const session = await auth()

    if (!session?.user.id) return {
        ok: false,
        message: 'Debe de estar autenticado'
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            OrderAddress: true,
        }
    })

    return {
        ok: true,
        orders,
    }
}