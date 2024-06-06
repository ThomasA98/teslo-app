'use server'
import prisma from "@/lib/prisma"

interface SetTransactionIdProps {
    transactionId: string
    orderId: string
}

export const setTransactionId = async ({ orderId, transactionId }: SetTransactionIdProps) => {
  try {
    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
            transactionId,
        }
    })

    return {
        ok: true,
        updatedOrder,
    }
  } catch (error) {
    return {
        ok: false,
        message: `No se pudo actualizar el transaction ${ transactionId } para la order ${ orderId }`
    }
  }
}