export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
    propertyId: z.string(),
});

export async function POST(req: Request) {
    try {
        // IMPORTANT: auth() may return null for guests
        const session = await auth().catch(() => null);

        const json = await req.json();
        const body = inquirySchema.parse(json);

        const inquiry = await db.inquiry.create({
            data: {
                message: body.message,
                propertyId: body.propertyId,
                guestName: body.name,
                guestEmail: body.email,
                guestPhone: body.phone,
                userId: session?.user?.id ?? null,
            },
        });

        return NextResponse.json(inquiry);
    } catch (error: any) {
        console.error("Inquiry API error:", error);

        if (error.code === 'P2021' || error.message?.includes('database file does not exist')) {
            return NextResponse.json(
                { error: "Database configuration error. Check connection string." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create inquiry" },
            { status: 500 }
        );
    }
}
