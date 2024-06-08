"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { ProductImage as ProductWithImage } from "@prisma/client";
import { Category, Gender, Product, Size } from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";

interface Props {
    product: Partial<Product> & { productImages?: Omit<ProductWithImage, 'productId'>[] }
    categories: Category[]
}

interface FormInputs {
    title: string
    slug: string
    description: string
    price: number
    inStock: number
    sizes: Size[]
    tags: string
    gender: Gender
    categoryId: string
    images?: FileList
}

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter()
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        watch,
        formState: { isValid },
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined,
        }
    })

    watch('sizes')

    const onSizeChange = (size: Size) => {
        const sizes = new Set(getValues('sizes'))
        sizes.has(size) ? sizes.delete(size) : sizes.add(size)
        setValue('sizes', Array.from(sizes))
    }

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData()

        const { images, ...productToSave } = data

        if (product.id) formData.append('id', product.id ?? '');
        formData.append('title', productToSave.title)
        formData.append('slug', productToSave.slug)
        formData.append('description', productToSave.description)
        formData.append('price', productToSave.price.toString())
        formData.append('inStock', productToSave.inStock.toString())
        formData.append('sizes', productToSave.sizes.toString())
        formData.append('tags', productToSave.tags)
        formData.append('categoryId', productToSave.categoryId)
        formData.append('gender', productToSave.gender)

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }

        const { ok, product: serverProduct, message } = await createUpdateProduct(formData)

        if (!ok) {
            alert(message)
        }

        router.replace(`/admin/product/${serverProduct?.slug}`)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('title', { required: true, })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('slug', { required: true, })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true, })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true, })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('gender', { required: true, })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', { required: true, })}
                    >
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('inStock', { required: true, min: 0 })}
                    />
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    onClick={() => onSizeChange(size)}
                                    className={clsx(
                                        "flex items-center cursor-pointer justify-center w-10 h-10 mr-2 border rounded-md transition-colors",
                                        {
                                            'bg-blue-500 text-white': getValues('sizes').includes(size),
                                        }
                                    )}
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            {...register('images')}
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {
                                product.productImages?.map(image => (
                                    <div key={image.id} className="overflow-hidden rounded-xl">
                                        <ProductImage
                                            alt={product.title ?? ''}
                                            src={image.url}
                                            width={300}
                                            height={300}
                                            className="rounded shadow-md w-full"
                                        />
                                        <button
                                            type="button"
                                            onClick={ () => deleteProductImage(image.id, image.url)}
                                            className="btn-danger w-full"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </form>
    );
};