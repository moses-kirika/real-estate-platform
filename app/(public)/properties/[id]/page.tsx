import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Bed, Bath, Square, User, ExternalLink } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { SavePropertyButton } from "@/components/save-property-button"
import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"

export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const session = await auth()

    const property = await db.property.findUnique({
        where: { id },
        include: {
            images: true,
            owner: { select: { id: true, name: true, image: true, email: true } }
        }
    })

    if (!property) {
        notFound()
    }

    // Check if property is saved by current user
    let isSaved = false
    if (session?.user?.id) {
        const savedListing = await db.savedListing.findUnique({
            where: {
                userId_propertyId: {
                    userId: session.user.id,
                    propertyId: id
                }
            }
        })
        isSaved = !!savedListing
    }

    // Use first image or placeholder
    const mainImage = property.images && property.images.length > 0
        ? property.images[0].url
        : "https://generated.vusercontent.net/placeholder.svg"

    return (
        <div className="container py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <div className="rounded-xl overflow-hidden aspect-video relative">
                        <Image
                            src={mainImage}
                            alt={property.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <Badge className="absolute top-4 left-4" variant="secondary">{property.status}</Badge>
                    </div>

                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold">{property.title}</h1>
                                <div className="flex items-center text-muted-foreground mt-2">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {property.location}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {formatCurrency(Number(property.price))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-6 border-y">
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                            <Bed className="h-6 w-6 mb-2 text-primary" />
                            <span className="font-bold">{property.bedrooms}</span>
                            <span className="text-xs text-muted-foreground">Bedrooms</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                            <Bath className="h-6 w-6 mb-2 text-primary" />
                            <span className="font-bold">{property.bathrooms}</span>
                            <span className="text-xs text-muted-foreground">Bathrooms</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                            <Square className="h-6 w-6 mb-2 text-primary" />
                            <span className="font-bold">{property.area}</span>
                            <span className="text-xs text-muted-foreground">Square Feet</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Description</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {property.description}
                        </p>
                    </div>

                    {property.features && property.features.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4">Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {property.features.split(",").map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                                        {feature.trim()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:w-[350px] space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <Link
                                href={`/agents/${property.owner.id}`}
                                className="flex items-center gap-3 mb-4 p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {property.owner.name?.charAt(0).toUpperCase() || "A"}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold group-hover:text-blue-600 transition-colors">{property.owner.name || "Agent"}</div>
                                    <div className="text-xs text-muted-foreground">Listing Agent</div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <ContactForm propertyId={property.id} />
                            <div className="mt-4">
                                <SavePropertyButton
                                    propertyId={property.id}
                                    initialSaved={isSaved}
                                    isAuthenticated={!!session?.user}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}
