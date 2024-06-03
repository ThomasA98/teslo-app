'use client'
import { useUiStore } from "@/store"
import Link from "next/link"

export interface SideBarLinkItemProps {
    href: string
    label: string
    icon: React.ReactNode
    onClick?: () => void
}

export const SideBarLinkItem: React.FC<SideBarLinkItemProps> = ({ href, label, icon, onClick }) => {

    const closeSideMenu = useUiStore(state => state.closeSideMenu)

    return (
        <Link
            href={ href }
            className="flex items-center p-2 gap-4 hover:bg-gray-100 rounded transition-all"
            onClick={ () => {
                onClick && onClick()
                closeSideMenu()
            } }
        >
            { icon }
            <span className="text-xl">{ label }</span>
        </Link>
    )
}