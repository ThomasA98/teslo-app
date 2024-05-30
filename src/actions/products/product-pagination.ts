'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"

export interface GetPaginatedProductsWithImagesProps {
    page?: number
    take?: number
    genders?: Gender[]
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, genders = ['unisex', 'kid', 'men', 'women'] }: GetPaginatedProductsWithImagesProps) => {

    if (isNaN( Number(page) )) page = 1
    if (page < 1) page = 1

    try {
        const [ productsCount, products ] = await prisma.$transaction([
            prisma.product.count({
                where: {
                    gender: {
                        in: genders
                    }
                },
            }),
            prisma.product.findMany({
                take,
                skip: take * (page - 1),
                where: {
                    gender: {
                        in: genders
                    }
                },
                include: {
                    productImages: {
                        take: 2,
                        select: {
                            url: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }
                },
            })
        ])

        return {
            products: products.map(({ productImages, category, ...product }) => ({
                ...product,
                type: category.name,
                images: productImages.map(image => image.url),
            })),
            currentPage: page,
            totalPages: Math.ceil(productsCount / take),
        }
    } catch (error) {
        throw new Error()
    }
}