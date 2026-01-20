import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { propertyId } = await request.json()

        if (!propertyId) {
            return NextResponse.json(
                { error: "Property ID required" },
                { status: 400 }
            )
        }

        // Check if already saved
        const existing = await db.savedListing.findUnique({
            where: {
                userId_propertyId: {
                    userId: session.user.id,
                    propertyId: propertyId,
                }
            }
        })

        if (existing) {
            return NextResponse.json(existing)
        }

        // Create new saved listing
        const savedListing = await db.savedListing.create({
            data: {
                userId: session.user.id,
                propertyId: propertyId,
            },
            include: {
                property: {
                    include: {
                        images: true
                    }
                }
            }
        })

        return NextResponse.json(savedListing)
    } catch (error) {
        console.error("Error saving property:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const savedListings = await db.savedListing.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                property: {
                    include: {
                        images: true,
                        owner: {
                            select: {
                                name: true,
                                email: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(savedListings)
    } catch (error) {
        console.error("Error fetching saved properties:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
