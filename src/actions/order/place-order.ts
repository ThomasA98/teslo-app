'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import type { Address, Size } from "@/interfaces"

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}

export interface PlaceOrderProps {
    productToOrder: ProductToOrder[]
    address: Address
}

export const placeOrder = async ({ address, productToOrder }: PlaceOrderProps) => {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) return {
        ok: false,
        message: 'No hay session de usuario',
    }

    console.log('userId', userId)

    const productsDB = await prisma.product.findMany({
        where: {
            id: {
                in: productToOrder.map(({ productId }) => productId)
            }
        },
        select: {
            id: true,
            inStock: true,
            price: true,
        }
    })

    const itemsInOrder = productToOrder.reduce((count, { quantity }) => count + quantity, 0)
    const { subTotal, tax, total } = productToOrder.reduce((total, item) => {

        const productQuantity = item.quantity
        const product = productsDB.find(product => product.id === item.productId)

        if (!product) throw new Error(`${item.productId} no existe - 500`)

        const subTotal = product.price * productQuantity
        const tax = subTotal * 0.15
        const productTotal = subTotal + tax

        return {
            subTotal: total.subTotal + subTotal,
            tax: total.tax + tax,
            total: total.total + productTotal,
        }

    }, {
        subTotal: 0,
        tax: 0,
        total: 0,
    } as Record<'subTotal' | 'tax' | 'total', number>)

    const { country, address2 = null, ...restAddress } = address

    try {
        const prismaTx = await prisma.$transaction(async tx => {

            const updatedProductsPromises = productsDB.map(product => {
                const productQuantity = productToOrder
                    .filter(({ productId }) => productId === product.id)
                    .reduce((acc, item) => acc + item.quantity, 0)

                if (productQuantity === 0) throw new Error(`${product.id} no tiene cantidad definida`)

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    },
                    select: {
                        inStock: true,
                        title: true,
                    }
                })
            })

            const updatedProducts = await Promise.all(updatedProductsPromises)

            updatedProducts.forEach(({ inStock, title }) => {
                if (inStock < 0) throw new Error(`${title} no tiene inventario suficiente`)
            })

            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    isPaid: false,
                    OrderItem: {
                        createMany: {
                            data: productToOrder.map(({ quantity, productId, size }) => ({
                                quantity,
                                size,
                                productId,
                                price: productsDB.find(({ id }) => id === productId)?.price ?? 0,
                            }))
                        }
                    },
                    OrderAddress: {
                        create: {
                            ...restAddress,
                            address2,
                            countryId: country,
                        }
                    },
                },
                select: {
                    id: true,
                }
            })

            return {
                order
            }

        })

        return {
            ok: true,
            order: prismaTx.order,
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }

}