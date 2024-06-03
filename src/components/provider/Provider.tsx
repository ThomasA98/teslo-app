import { SessionProvider } from "next-auth/react"

export interface ProviderProps {
    children: React.ReactNode
}

export const Provider: React.FC<ProviderProps> = async ({ children }) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}