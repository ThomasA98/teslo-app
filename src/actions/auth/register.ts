'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

interface RegisterUserProps {
    name: string
    email: string
    password: string
}

export const registerUser = async ({ email, name, password }: RegisterUserProps) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password),
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })

        return {
            ok: true,
            user,
            message: 'Usuario creado'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo crear el usuario',
        }
    }
}