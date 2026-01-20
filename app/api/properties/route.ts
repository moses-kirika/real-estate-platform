import { db } from "@/lib/db"
import { auth } from "@/auth"
import { propertySchema } from "@/lib/validations/property"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        // Basic fltering logic
        const propertyType = searchParams.get("type")
        const maxPrice = searchParams.get("maxPrice")

        const where: { status: string; type?: string; price?: { lte: number } } = {
            status: "AVAILABLE"
        }

        if (propertyType) {
            where.type = propertyType
        }

        if (maxPrice) {
            where.price = { lte: parseFloat(maxPrice) }
        }

        const properties = await db.property.findMany({
            where,
            include: {
                images: true,
                owner: { select: { name: true, image: true, email: true } }
            },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(properties)
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session || !session.user || session.user.role === "USER") {
            // Only Agents and Admins can create
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const json = await req.json()
        const body = propertySchema.parse(json)

        const property = await db.property.create({
            data: {
                ...body,
                features: Array.isArray(body.features) ? body.features.join(", ") : body.features || "",
                ownerId: session.user.id!,
            },
        })

        return NextResponse.json(property, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
