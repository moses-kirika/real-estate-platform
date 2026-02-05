import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Property } from "@prisma/client"
import { MapPin, Bed, Bath, Square, Home as HomeIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface PropertyRowProps {
    property: Partial<Property> & { images?: { url: string }[] }
    message?: string
}

export function PropertyRow({ property, message }: PropertyRowProps) {
    const mainImage = property.images && property.images.length > 0
        ? property.images[0].url
        : null

    return (
        <Card className="group overflow-hidden rounded-2xl border border-zinc-100 hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row h-full">
                    {/* Image Section */}
                    <Link href={`/properties/${property.id}`} className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-zinc-100 shrink-0">
                        {mainImage ? (
                            <Image
                                src={mainImage}
                                alt={property.title || "Property"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <HomeIcon className="h-10 w-10 text-zinc-300" />
                            </div>
                        )}
                        <div className="absolute top-3 left-3 z-10">
                            <div className="bg-white/90 backdrop-blur-sm text-zinc-900 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-zinc-200/50">
                                {property.status}
                            </div>
                        </div>
                    </Link>

                    {/* Content Section */}
                    <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-secondary font-bold">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="text-[10px] uppercase tracking-widest line-clamp-1">{property.location}</span>
                            </div>
                            <Link
                                href={`/properties/${property.id}`}
                                className="text-xl font-serif font-bold leading-tight text-primary hover:text-secondary transition-colors line-clamp-1"
                            >
                                {property.title}
                            </Link>

                            {message && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-2 italic bg-muted/50 p-2 rounded-lg border border-border/50">
                                    "{message}"
                                </p>
                            )}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
                                {property.bedrooms !== undefined && (
                                    <div className="flex items-center gap-1.5">
                                        <Bed className="h-3.5 w-3.5" />
                                        <span>{property.bedrooms}</span>
                                    </div>
                                )}
                                {property.bathrooms !== undefined && (
                                    <div className="flex items-center gap-1.5">
                                        <Bath className="h-3.5 w-3.5" />
                                        <span>{property.bathrooms}</span>
                                    </div>
                                )}
                                {property.area !== undefined && (
                                    <div className="flex items-center gap-1.5">
                                        <Square className="h-3.5 w-3.5" />
                                        <span>{property.area} <span className="text-[8px] uppercase">sqft</span></span>
                                    </div>
                                )}
                            </div>

                            <Button
                                className="h-10 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 px-4"
                                asChild
                            >
                                <a href={`https://wa.me/254700000000?text=I'm interested in ${encodeURIComponent(property.title || "")} at ${encodeURIComponent(property.location || "")}`} target="_blank" rel="noopener noreferrer">
                                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.632 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    <span className="text-sm">WhatsApp</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card >
    )
}
