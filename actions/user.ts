"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(formData: FormData) {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (!email || !name) {
        throw new Error("Name and Email are required")
    }

    // Check if email is already taken by another user
    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser && existingUser.id !== session.user.id) {
        throw new Error("Email already in use")
    }

    await db.user.update({
        where: { id: session.user.id },
        data: {
            name,
            email,
        }
    })

    revalidatePath("/dashboard/settings")
}
