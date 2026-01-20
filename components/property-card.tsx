import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Property } from "@prisma/client"
import { MapPin, Bed, Bath, Square } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface PropertyCardProps {
    property: Property & { images: { url: string }[] }
}

export function PropertyCard({ property }: PropertyCardProps) {
    // Use first image or placeholder
    const mainImage = property.images && property.images.length > 0
        ? property.images[0].url
        : "https://generated.vusercontent.net/placeholder.svg"

    return (
        <Card className="group overflow-hidden rounded-3xl border border-zinc-200/50 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={mainImage}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/90 backdrop-blur-md text-zinc-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                        {property.status}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <CardHeader className="space-y-1 pt-6 px-6">
                <CardDescription className="flex items-center gap-1.5 text-blue-600 font-semibold mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-widest">{property.location}</span>
                </CardDescription>
                <CardTitle className="text-2xl font-bold leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {property.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-6 pb-6">
                <div className="flex items-center justify-between text-zinc-500 text-sm mb-6 border-y border-zinc-100 py-4 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-50 rounded-lg"><Bed className="h-4 w-4" /></div>
                        {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-50 rounded-lg"><Bath className="h-4 w-4" /></div>
                        {property.bathrooms} Baths
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-50 rounded-lg"><Square className="h-4 w-4" /></div>
                        {property.area} <span className="text-[10px] uppercase">sqft</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="text-3xl font-black tracking-tight text-zinc-900">
                        {formatCurrency(Number(property.price))}
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-zinc-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm" asChild>
                        <Link href={`/properties/${property.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
