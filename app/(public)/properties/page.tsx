import { db } from "@/lib/db"
import { PropertyCard } from "@/components/property-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: { query?: string }
}) {
    const query = searchParams?.query || ""

    const properties = await db.property.findMany({
        where: {
            status: "AVAILABLE",
            OR: query ? [
                { location: { contains: query } },
                { title: { contains: query } },
            ] : undefined,
        },
        include: { images: true },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
                    <p className="text-muted-foreground">Find your dream home from our latest listings.</p>
                </div>
                <form action="/properties" className="flex gap-2 w-full md:w-auto">
                    <Input
                        name="query"
                        placeholder="Search locations or titles..."
                        defaultValue={query}
                        className="max-w-xs"
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {properties.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-lg font-medium">No properties found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters.</p>
                </div>
            )}
        </div>
    )
}
