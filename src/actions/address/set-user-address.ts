'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

interface Props {
    address: Address
    userId: string
}

export const setUserAddress = async ({ address, userId }: Props) => {
  try {
    const newAddress = await createOrReplaceAddress({ address, userId })

    return {
        ok: true,
        address: newAddress,
    }
  } catch (error) {
    console.log(error)
    return {
        ok: false,
        message: 'No se pudo guardar la direccion'
    }
  }
}

const createOrReplaceAddress = async ({ address, userId }: Props) => {

    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

        const { country, ...restData } = address

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...restData,
                    userId,
                    countryId: country,
                }
            })

            return newAddress
        }

        const updateAddress = await prisma.userAddress.update({
            where: { userId },
            data: {
                ...restData,
                countryId: country,
            }
        })

        return updateAddress
    } catch (error) {
        throw error
    }

}