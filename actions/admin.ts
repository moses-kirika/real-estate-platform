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

export async function createTestimonialAction(data: { name: string; role: string; content: string; rating: number }) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await db.testimonial.create({ data })
    revalidatePath("/admin/content")
}

export async function deleteTestimonialAction(id: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await db.testimonial.delete({ where: { id } })
    revalidatePath("/admin/content")
}
