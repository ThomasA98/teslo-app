'use server'

import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"
import { auth } from "@/auth.config"

export const getOrderById = async (id: string) => {

    const session = await auth()
    const userId = session?.user.id
    const userRole = session?.user.role as Role

    if (!userId) return {
        ok: false,
        message: 'Debe de estar logeado',
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            select: {
                userId: true,
                total: true,
                subTotal: true,
                tax: true,
                isPaid: true,
                itemsInOrder: true,
                OrderAddress: {
                    select: {
                        country: true,
                        address: true,
                        address2: true,
                        city: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        postalCode: true,
                    }
                },
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                productImages: {
                                    take: 1,
                                    select: {
                                        url: true
                                    }
                                },
                            }
                        },
                    }
                },
            }
        })

        if (!order) return {
            ok: false,
            message: `${ id } no existe`,
        }

        if (!(order.userId === userId || userRole === 'admin')) return {
            ok: false,
            message: 'no authorizado',
        }

        return {
            order,
            ok: true,
        }
    } catch (error) {
        return {
            ok: false,
            message: '500 - hable con el administrador'
        }
    }
}