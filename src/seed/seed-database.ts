import { initialData } from "./seed";
import prisma from '../lib/prisma'
import { countries } from "./seed-countries";

async function main() {

    console.log(process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') return

    await prisma.$transaction([
        prisma.orderAddress.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.order.deleteMany(),
        prisma.userAddress.deleteMany(),
        prisma.country.deleteMany(),
        prisma.user.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ])

    const [ , ,categoriesDB ] = await prisma.$transaction([
        prisma.user.createMany({ data: initialData.users }),
        prisma.country.createMany({ data: countries }),
        prisma.category.createManyAndReturn({
            data: initialData.categories.map(category => ({ name: category }))
        })
    ])

    // const categoriesDB = await prisma.category.createManyAndReturn({
    //     data: initialData.categories.map(category => ({ name: category }))
    // })

    // const categoriesDB = await prisma.category.findMany()

    // await prisma.user.createMany({
    //     data: initialData.users
    // })

    const categories = categoriesDB.reduce((acc, { id, name }) => ({
        ...acc,
        [ name.toLowerCase() ]: id
    }), {} as Record<string, string>)

    const productsDB = await prisma.product.createManyAndReturn({
        data: initialData.products.map(({ type, images, ...restProduct }) => ({
            ...restProduct,
            categoryId: categories[type],
        })),
        select: {
            id: true,
            slug: true,
        }
    })

    // const productsDB = await prisma.product.findMany({
    //     select: {
    //         id: true,
    //         slug: true
    //     }
    // })

    // { slug: id, ...{ slug: id } }
    const indexedProductsID = productsDB.reduce(
        (acc, { id, slug }) => ({
            ...acc, [slug]: id
        }),
        {} as Record<string, string>
    )

    // { image, id }[]
    const imagesBySlug = initialData.products.flatMap(
        ({ images, slug }) => images.map(
            image => ({ image, id: indexedProductsID[slug] })
        )
    )

    await prisma.productImage.createMany({
        data: imagesBySlug.map(({ id, image }) => ({
            productId: id,
            url: image
        }))
    })

}

(() => {
    main()
})()