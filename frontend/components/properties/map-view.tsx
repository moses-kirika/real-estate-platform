"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { Property } from "./property-results"

// Fix Leaflet marker icon issue in Next.js
const icon = typeof window !== 'undefined' ? L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
}) : undefined

interface MapViewProps {
    properties: Property[]
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, map.getZoom())
    }, [center, map])
    return null
}

export default function MapView({ properties }: MapViewProps) {
    const validProperties = properties.filter(p => p.lat !== null && p.lng !== null)

    // Default center to Nairobi if no properties or no valid coordinates
    const defaultCenter: [number, number] = [-1.2921, 36.8219]

    // Calculate center based on properties
    const center: [number, number] = validProperties.length > 0
        ? [
            validProperties.reduce((sum, p) => sum + (p.lat || 0), 0) / validProperties.length,
            validProperties.reduce((sum, p) => sum + (p.lng || 0), 0) / validProperties.length
        ]
        : defaultCenter

    return (
        <div className="h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden border border-zinc-200 shadow-inner z-0">
            <MapContainer
                center={center}
                zoom={validProperties.length > 1 ? 6 : 13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeView center={center} />
                {validProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.lat!, property.lng!]}
                        icon={icon}
                    >
                        <Popup className="rounded-2xl">
                            <div className="p-1 space-y-3 min-w-[200px]">
                                {property.images?.[0] && (
                                    <div className="h-24 w-full relative rounded-xl overflow-hidden">
                                        <img
                                            src={property.images[0].url}
                                            alt={property.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}
                                <div>
                                    <Badge variant="secondary" className="mb-2 bg-secondary/10 text-primary border-0 font-bold uppercase tracking-tighter text-[10px]">
                                        For {property.type === 'SALE' ? 'Sale' : 'Rent'}
                                    </Badge>
                                    <h4 className="font-serif font-bold text-primary leading-tight line-clamp-1">{property.title}</h4>
                                    <p className="text-secondary font-black text-sm">KES {Number(property.price).toLocaleString()}</p>
                                    <div className="flex items-center gap-1 text-zinc-400 text-[10px] mt-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{property.location}</span>
                                    </div>
                                </div>
                                <Link
                                    href={`/properties/${property.id}`}
                                    className="block w-full py-2 bg-primary text-white text-center text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
