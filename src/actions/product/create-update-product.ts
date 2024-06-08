'use server'

import { z } from 'zod'
import { Gender, Product } from '@prisma/client'
import prisma from '@/lib/prisma'
import { Size } from '@/interfaces'
import { revalidatePath } from 'next/cache'

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)

    if (!productParsed.success) return {
        ok: false,
    }

    const product = productParsed.data
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

    const { id, ...rest } = product

    const tagsArray = rest.tags.split(', ').map(tag => tag.trim().toLowerCase())
    try {
        const productTx = await prisma.$transaction(
            async tx => {

                let product: Product

                if (id) {
                    product = await tx.product.update({
                        where: { id },
                        data: {
                            ...rest,
                            tags: tagsArray,
                            sizes: {
                                set: rest.sizes as Size[]
                            },
                        }
                    })
                }
                else {
                    product = await tx.product.create({
                        data: {
                            ...rest,
                            tags: tagsArray,
                            sizes: {
                                set: rest.sizes as Size[]
                            },
                        }
                    })
                }

                if (formData.getAll('images')) {
                    const urlImages = await uploadImages(formData.getAll('images') as File[]);
                    if (!urlImages) {
                        throw new Error('No se pudo cargar las imagenes, rollinback')
                    }

                    await prisma.productImage.createMany({
                        data: urlImages.map(image => ({
                            url: image!,
                            productId: product.id
                        }))
                    })
                }

                return {
                    product
                }
            }
        )

        revalidatePath('/admin/products')
        revalidatePath(`/admin/product/${ product.slug }`)
        revalidatePath(`/products/${ product.slug }`)

        return {
            ok: true,
            product: productTx.product,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el producto'
        }
    }

}

const uploadImages = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async image => {
            try {
                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64')
                return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
                    .then(r => r.secure_url)
            } catch (error) {
                console.log(error)
                return null
            }
        })

        const uploadImages = await Promise.all(uploadPromises)

        return uploadImages


    } catch (error) {
        console.log(error)
        return null
    }

}