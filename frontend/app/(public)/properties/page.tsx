export const dynamic = "force-dynamic";

import { db } from "@backend/lib/db"
import { PropertyCard } from "@/components/property-card"
import { PropertyResults } from "@/components/properties/property-results"
import { FilterSidebar } from "@/components/properties/filter-sidebar"

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: {
        query?: string
        type?: string
        minPrice?: string
        maxPrice?: string
        bedrooms?: string
    }
}) {
    const query = searchParams?.query || ""
    const type = searchParams?.type
    const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : undefined
    const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined
    const bedrooms = searchParams?.bedrooms ? Number(searchParams.bedrooms) : undefined

    const properties = await db.property.findMany({
        where: {
            status: "AVAILABLE",
            // Search query logic
            ...(query ? {
                OR: [
                    { location: { contains: query } },
                    { title: { contains: query } },
                ]
            } : {}),
            // Type filter
            ...(type ? { type } : {}),
            // Price filter
            price: {
                gte: minPrice,
                lte: maxPrice,
            },
            // Bedrooms filter
            ...(bedrooms ? {
                bedrooms: { gte: bedrooms }
            } : {})
        },
        include: { images: true },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="container py-12 px-4 max-w-7xl mx-auto">
            <div className="mb-12 border-b border-zinc-200 pb-12">
                <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-primary mb-4">
                    Explore Our <br className="hidden md:block" />Verified Listings
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                    From high-end apartments in Westlands to tranquil family homes in Karen and Lavington.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Sidebar Filter */}
                <FilterSidebar />

                {/* Results Section */}
                <PropertyResults properties={properties} />
            </div>
        </div>
    )
}
