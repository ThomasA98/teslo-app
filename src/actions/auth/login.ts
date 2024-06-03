'use server'

import { signIn } from "@/auth.config"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        })

        return 'Success'
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignIn')) {
            return 'CredentialsSignIn'
        }
        return 'Error Unknown'
    }
}

export const login = async ({ email, password }: Record<'email' | 'password', string>) => {
    try {
        await signIn('credentials', { email, password })

        return {
            ok: true,
        }
    } catch (error) {
        return {
            ok: false,
            message: 'no se pudo iniciar session'
        }
    }
}