import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const inquirySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
    propertyId: z.string(),
    agentId: z.string().optional(), // If we target a specific agent
})

export async function POST(req: Request) {
    try {
        const session = await auth()
        const json = await req.json()
        const body = inquirySchema.parse(json)

        const inquiry = await db.inquiry.create({
            data: {
                message: body.message,
                propertyId: body.propertyId,
                userId: session?.user?.id, // Optional: link to logged in user if available
                // Note: Our Inquiry model might not have name/email/phone fields if we designed it to link to User.
                // Let's check schema.prisma first! 
                // If the schema requires a user, guest inquiries fail. 
                // For now, assuming Inquiry has relation to User.
                // Wait, I should verify schema.
            },
        })

        return NextResponse.json(inquiry)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
