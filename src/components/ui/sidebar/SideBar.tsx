'use client'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import clsx from "clsx"
import { useUiStore } from "@/store"
import { logout } from "@/actions"
import { SideBarLinkItem, SideBarLinkItemProps } from "./SideBarLinkItem"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const linkItems: SideBarLinkItemProps[] = [
    {
        href: '/profile',
        label: 'Perfil',
        icon: <IoPersonOutline size={ 25 } />,
    },{
        href: '/orders',
        label: 'Orders',
        icon: <IoTicketOutline size={ 25 } />,
    },
]

const authItems: SideBarLinkItemProps[] = [
    {
        href: '/auth/login',
        label: 'Ingresar',
        icon: <IoLogInOutline size={ 25 } />,
    },{
        href: '/',
        label: 'Salir',
        onClick: async () => {
            await logout()
            window.location.replace('/')
        },
        icon: <IoLogOutOutline size={ 25 } />,
    },
]

const adminLinkItems: SideBarLinkItemProps[] = [
    {
        href: '/admin/products',
        label: 'Products',
        icon: <IoShirtOutline size={ 25 } />,
    },{
        href: '/admin/orders',
        label: 'Ordenes',
        icon: <IoTicketOutline size={ 25 } />,
    },{
        href: '/admin/users',
        label: 'Usuarios',
        icon: <IoPeopleOutline size={ 25 } />,
    },
]

export const SideBar = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen)
    const closeSideMenu = useUiStore(state => state.closeSideMenu)
    const { data: session, status } = useSession()
    const [ isAuthenticated, setIsAuthenticated ] = useState(status === 'authenticated')

    useEffect(
        () => {
            setIsAuthenticated(status === 'authenticated')
        },
        [ session, status, isSideMenuOpen ]
    )

  return (
    <div>

        {
            isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
            )
        }

        {
            isSideMenuOpen && (
                <div
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    onClick={ closeSideMenu }
                ></div>
            )
        }

        <nav className={
            clsx(
                'fixed p-5 right-0 top-0 w-[80vw] sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                {
                    'translate-x-full' : !isSideMenuOpen
                }
            )
        }>
            <IoCloseOutline
                size={ 50 }
                className="absolute top-5 right-5 cursor-pointer"
                onClick={ closeSideMenu }
            />

            <div className="relative my-14">
                <IoSearchOutline
                    size={ 25 }
                    className="absolute top-2 left-2"
                />
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="flex flex-col gap-3">
                {
                    status === 'authenticated' && linkItems.map(item => (
                        <SideBarLinkItem
                            key={ item.href }
                            { ...item }
                        />
                    ))
                }
                {
                    status !== 'loading' && (
                        <SideBarLinkItem
                            { ...authItems[+isAuthenticated] }
                        />
                    )
                }
            </div>

            <hr className="my-10" />

            <div className="flex flex-col gap-3">
                {
                    session?.user.role === 'admin' && adminLinkItems.map(item => (
                        <SideBarLinkItem
                            key={ item.href }
                            { ...item }
                        />
                    ))
                }
            </div>
        </nav>

    </div>
  )
}