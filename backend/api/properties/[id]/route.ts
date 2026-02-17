import { db } from "@backend/lib/db"
import { auth } from "@backend/auth"
import { propertySchema } from "@backend/lib/validations/property"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()
        if (!session || !session.user || session.user.role === "USER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = params
        const json = await req.json()
        const body = propertySchema.parse(json)

        // Verify ownership
        const existingProperty = await db.property.findUnique({
            where: { id },
        })

        if (!existingProperty) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 })
        }

        if (existingProperty.ownerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const property = await db.property.update({
            where: { id },
            data: {
                ...body,
                features: Array.isArray(body.features) ? body.features.join(", ") : body.features || "",
            },
        })

        return NextResponse.json(property)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()
        if (!session || !session.user || session.user.role === "USER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = params

        // Verify ownership
        const existingProperty = await db.property.findUnique({
            where: { id },
        })

        if (!existingProperty) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 })
        }

        if (existingProperty.ownerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await db.property.delete({
            where: { id },
        })

        return new NextResponse(null, { status: 204 })
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
