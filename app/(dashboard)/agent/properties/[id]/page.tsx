import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { PropertyForm } from "@/components/property-form"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth"

export default async function EditPropertyPage({
    params,
}: {
    params: { id: string }
}) {
    const session = await auth()
    const { id } = params

    const property = await db.property.findUnique({
        where: { id },
    })

    if (!property || property.ownerId !== session?.user?.id) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Property</h2>
                <p className="text-muted-foreground">
                    Update the details for &quot;{property.title}&quot;.
                </p>
            </div>
            <Separator />
            <div className="max-w-2xl">
                {/* @ts-expect-error - Decimal type mismatch from Prisma */}
                <PropertyForm initialData={property} />
            </div>
        </div>
    )
}
