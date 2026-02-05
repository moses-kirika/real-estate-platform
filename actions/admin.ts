"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function verifyUserAction(userId: string) {
    const session = await auth()

    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await db.user.update({
        where: { id: userId },
        data: {
            verifiedAt: new Date(),
        },
    })

    revalidatePath("/admin")
}

export async function unverifyUserAction(userId: string) {
    const session = await auth()

    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await db.user.update({
        where: { id: userId },
        data: {
            verifiedAt: null,
        },
    })

    revalidatePath("/admin")
}

export async function deleteUserAction(userId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await db.user.delete({ where: { id: userId } })
    revalidatePath("/admin/users")
}

export async function deletePropertyAction(propertyId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await db.property.delete({ where: { id: propertyId } })
    revalidatePath("/admin/properties")
}

export async function createTestimonialAction(formData: FormData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const rating = parseInt(formData.get("rating") as string)
    const content = formData.get("content") as string

    await db.testimonial.create({
        data: {
            name,
            role,
            rating,
            content,
        }
    })
    revalidatePath("/admin/content")
}

export async function deleteTestimonialAction(id: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await db.testimonial.delete({ where: { id } })
    revalidatePath("/admin/content")
}

export async function updateUserEmailAction(formData: FormData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const userId = formData.get("userId") as string
    const email = formData.get("email") as string

    await db.user.update({
        where: { id: userId },
        data: { email }
    })
    revalidatePath("/admin/users")
}
