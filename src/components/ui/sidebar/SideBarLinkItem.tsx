import Link from "next/link"

export interface SideBarLinkItemProps {
    href: string
    label: string
    icon: React.ReactNode
}

export const SideBarLinkItem: React.FC<SideBarLinkItemProps> = ({ href, label, icon }) => {
    return (
        <Link
            href={ href }
            className="flex items-center p-2 gap-4 hover:bg-gray-100 rounded transition-all"
        >
            { icon }
            <span className="text-xl">{ label }</span>
        </Link>
    )
}