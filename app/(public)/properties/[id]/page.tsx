export const dynamic = "force-dynamic";

import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Bed, Bath, Square, User, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { SavePropertyButton } from "@/components/save-property-button"
import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"

export default async function PropertyDetailsPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = params
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
        <div className="min-h-screen bg-[#faf9f6] pb-20">
            <div className="container py-12 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <div className="rounded-[2.5rem] overflow-hidden aspect-video relative shadow-2xl">
                                <Image
                                    src={mainImage}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <Badge className="absolute top-6 left-6 px-4 py-2 text-md font-bold bg-secondary text-primary border-0 rounded-full shadow-lg" variant="secondary">
                                    {property.status === "AVAILABLE" ? "Live Listing" : property.status}
                                </Badge>
                            </div>

                            {property.images && property.images.length > 1 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {property.images.slice(1, 5).map((image, index) => (
                                        <div key={index} className="rounded-2xl overflow-hidden aspect-video relative shadow-md group cursor-pointer">
                                            <Image
                                                src={image.url}
                                                alt={`${property.title} - View ${index + 2}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary tracking-tight leading-tight">{property.title}</h1>
                                    <div className="flex items-center text-zinc-500 text-lg font-medium">
                                        <MapPin className="h-5 w-5 mr-2 text-secondary shrink-0" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-serif font-black text-primary bg-secondary/10 px-6 py-3 rounded-2xl border border-secondary/20 whitespace-nowrap self-start">
                                    {formatCurrency(Number(property.price))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 py-8 border-y border-zinc-200">
                            <div className="flex items-center sm:flex-col sm:justify-center gap-4 sm:gap-0 p-6 bg-white rounded-3xl shadow-sm border border-zinc-100">
                                <Bed className="h-7 w-7 sm:mb-3 text-secondary" />
                                <div className="flex flex-col sm:items-center">
                                    <span className="text-2xl font-serif font-black text-primary">{property.bedrooms}</span>
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Bedrooms</span>
                                </div>
                            </div>
                            <div className="flex items-center sm:flex-col sm:justify-center gap-4 sm:gap-0 p-6 bg-white rounded-3xl shadow-sm border border-zinc-100">
                                <Bath className="h-7 w-7 sm:mb-3 text-secondary" />
                                <div className="flex flex-col sm:items-center">
                                    <span className="text-2xl font-serif font-black text-primary">{property.bathrooms}</span>
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Bathrooms</span>
                                </div>
                            </div>
                            <div className="flex items-center sm:flex-col sm:justify-center gap-4 sm:gap-0 p-6 bg-white rounded-3xl shadow-sm border border-zinc-100">
                                <Square className="h-7 w-7 sm:mb-3 text-secondary" />
                                <div className="flex flex-col sm:items-center">
                                    <span className="text-2xl font-serif font-black text-primary">{property.area}</span>
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Square Feet</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-primary">About this Sanctuary</h3>
                            <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                {property.description}
                            </p>
                        </div>

                        {property.features && property.features.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-serif font-bold text-primary">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {property.features.split(",").map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm font-medium text-zinc-700">
                                            <div className="w-2 h-2 rounded-full bg-secondary mr-3 shrink-0" />
                                            {feature.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-[400px] space-y-8">
                        <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] sticky top-24">
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Listing Professionally Managed By</h3>
                                    <Link
                                        href={`/agents/${property.owner.id}`}
                                        className="flex items-center gap-4 p-4 -mx-4 rounded-3xl hover:bg-zinc-50 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform">
                                            {property.owner.name?.charAt(0).toUpperCase() || "A"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xl font-serif font-bold text-primary group-hover:text-secondary transition-colors">
                                                {property.owner.name || "Verified Agent"}
                                            </div>
                                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0 mt-1">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Silver Elite Partner
                                            </Badge>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-zinc-300 group-hover:text-primary transition-colors" />
                                    </Link>
                                </div>

                                <div className="space-y-4 border-t border-zinc-100 pt-8">
                                    <Button
                                        className="w-full h-14 text-lg font-bold rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl shadow-emerald-500/20 gap-3"
                                        asChild
                                    >
                                        <a href={`https://wa.me/254700000000?text=I'm interested in viewing ${encodeURIComponent(property.title || "")} at ${encodeURIComponent(property.location || "")}. Is it still available?`} target="_blank" rel="noopener noreferrer">
                                            <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2c-5.517 0-9.993 4.477-9.993 9.994 0 1.763.459 3.42 1.258 4.864l-1.334 4.872 4.985-1.308c1.399.761 2.997 1.2 4.69 1.2 5.518 0 9.996-4.477 9.996-9.995 0-5.516-4.478-9.993-9.996-9.993zm-4.329 13.974c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2z" /></svg>
                                            Inquire on WhatsApp
                                        </a>
                                    </Button>

                                    <div className="relative py-4 text-center">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
                                        <span className="relative bg-white px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">or send email</span>
                                    </div>

                                    <ContactForm propertyId={property.id} />
                                </div>

                                <div className="pt-4">
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
        </div>


    )
}
