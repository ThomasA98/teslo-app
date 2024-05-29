import { titleFont } from "@/config/fonts"

export interface TitleProps {
    title: string
    subtitle?: string
    className?: string
}

export const Title: React.FC<TitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={ `flex flex-col gap-4 ${className} ` }>
        <h1 className={ `${titleFont.className} antialiased text-4xl font-semibold` }>
            { title }
        </h1>
        {
            subtitle && <h3 className="text-xl">{ subtitle }</h3>
        }
    </div>
  )
}