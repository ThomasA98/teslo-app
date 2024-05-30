'use client'
import { generatePagination } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

export interface PaginationProps {
    totalPages: number
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {

    const pathName = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page') ?? 1)

    const allPages = generatePagination(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)

        if (pageNumber === '...') return `${pathName}?${params.toString()}`

        if (Number(pageNumber) < 1) return `${pathName}`

        if (Number(pageNumber) > totalPages) return `${pathName}?${params.toString()}`

        params.set('page', pageNumber.toString())
        return `${pathName}?${params.toString()}`
    }

    return (
        <div className="flex justify-center text-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl(currentPage - 1) }
                        >
                            <IoChevronBackOutline size={ 25 } />
                        </Link>
                    </li>
                    {
                        allPages.map((page, index) => (
                            <li className="page-item" key={page + '-' + index}>
                                <Link
                                    className={clsx(
                                        'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                                        {
                                            'bg-blue-500 shadow-sm text-white hover:bg-blue-400': page === currentPage,
                                        }
                                    )}
                                    href={ createPageUrl(page) }
                                >
                                    { page }
                                </Link>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl(currentPage + 1) }
                        >
                            <IoChevronForwardOutline size={ 25 } />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}