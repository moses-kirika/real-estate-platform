"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Property as PrismaProperty } from "@prisma/client"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Map as MapIcon, Loader2 } from "lucide-react"

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("./map-view"), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-zinc-500 font-medium">Initializing Interactive Map...</p>
        </div>
    )
})

export type Property = PrismaProperty & {
    images: { url: string }[]
}

interface PropertyResultsProps {
    properties: Property[]
}

export function PropertyResults({ properties }: PropertyResultsProps) {
    const [view, setView] = useState<"list" | "map">("list")

    return (
        <div className="flex-1 space-y-8">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between border-b border-zinc-100 pb-6 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-900 font-bold">{properties.length}</span>
                    <span className="text-zinc-500">Properties found</span>
                </div>
                <div className="flex bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
                    <Button
                        variant={view === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("list")}
                        className={`rounded-xl px-4 font-bold transition-all ${view === "list" ? "shadow-lg" : "text-zinc-500"}`}
                    >
                        <LayoutGrid className="h-4 w-4 mr-2" />
                        List
                    </Button>
                    <Button
                        variant={view === "map" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("map")}
                        className={`rounded-xl px-4 font-bold transition-all ${view === "map" ? "shadow-lg" : "text-zinc-500"}`}
                    >
                        <MapIcon className="h-4 w-4 mr-2" />
                        Map
                    </Button>
                </div>
            </div>

            {view === "list" ? (
                <>
                    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    {properties.length === 0 && (
                        <div className="text-center py-20 bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-sm px-8">
                            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
                                <LayoutGrid className="h-8 w-8 text-zinc-300" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-2">No properties matched</h3>
                            <p className="text-zinc-500 max-w-sm mx-auto">
                                We couldn't find any listings matching your current filters. Try broadening your reach.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <MapView properties={properties} />
            )}
        </div>
    )
}
