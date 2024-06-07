'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"

interface GetPaginatedOrdersProps {

}

export const getPaginatedOrders = async ({}: GetPaginatedOrdersProps) => {
    const session = await auth()

    if (session?.user.role !== 'admin') return {
        ok: false,
        message: 'Debe estar autenticado'
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc'
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