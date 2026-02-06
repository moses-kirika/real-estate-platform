export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(
    req: Request,
    { params }: Params
) {
    try {
        const property = await db.property.findUnique({
            where: { id: params.id },
            include: {
                images: true,
                owner: {
                    select: { name: true, image: true, email: true },
                },
            },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(property);
    } catch (error) {
        console.error("Property [id] API error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
