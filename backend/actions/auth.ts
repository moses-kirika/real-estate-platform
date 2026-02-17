"use server"

import { signIn, signOut } from "@backend/auth"
import { AuthError } from "next-auth"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"

const prisma = new PrismaClient()

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    phone: z.string().optional(),
    company: z.string().optional(),
    licenseNumber: z.string().optional(),
    address: z.string().optional(),
    idNumber: z.string().optional(),
})

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirectTo: "/",
        })
    } catch (error) {
        // Check if it's a redirect error (Next.js throws NEXT_REDIRECT)
        if (error && typeof error === 'object' && 'digest' in error &&
            typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
            throw error
        }
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials."
                default:
                    return "Something went wrong."
            }
        }
        return "Internal server error."
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return "Invalid fields";
    }

    const { email, password, name } = validatedFields.data;

    // Get role from formData, default to USER
    const role = (formData.get("role") as string) || "USER";

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return "User already exists.";
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role,
                phone: (formData.get("phone") as string) || undefined,
                company: (formData.get("company") as string) || undefined,
                licenseNumber: (formData.get("licenseNumber") as string) || undefined,
                address: (formData.get("address") as string) || undefined,
                idNumber: (formData.get("idNumber") as string) || undefined,
            },
        });

        // Auto login not supported easily in server action flow without redirecting to login or custom logic.
        // We will just return success message or undefined to indicate success.
        return "Success";

    } catch (error) {
        console.error(error);
        return "Failed to create user.";
    }
}

export async function signOutAction() {
    await signOut()
}
