export interface User {
    id: string
    email: string
    name: string
    password: string
    role: Role
    emailVerified?: Date | null
    image?: string | null
}

export type Role = 'admin' | 'user'