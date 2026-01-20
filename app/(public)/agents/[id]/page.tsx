import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    User,
    Mail,
    Phone,
    Building2,
    MapPin,
    Calendar,
    Home,
    ArrowLeft,
    Shield,
    CheckCircle,
    MessageSquare
} from "lucide-react"
import Link from "next/link"

export default async function AgentProfilePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    // Get agent details
    const agent = await db.user.findUnique({
        where: {
            id,
            role: "AGENT"
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
            company: true,
            licenseNumber: true,
            address: true,
            createdAt: true,
            properties: {
                where: {
                    status: "AVAILABLE"
                },
                include: {
                    images: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            },
            _count: {
                select: {
                    properties: true
                }
            }
        }
    })

    if (!agent) {
        notFound()
    }

    const memberSince = new Date(agent.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Link */}
                <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back to Agents</span>
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Agent Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 overflow-hidden border-0 shadow-xl">
                            {/* Header Background */}
                            <div className="h-32 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500" />

                            <CardContent className="p-6 pt-0 -mt-16 relative">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-2xl bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white mb-4">
                                    {agent.name?.charAt(0).toUpperCase() || agent.email.charAt(0).toUpperCase()}
                                </div>

                                {/* Name and Company */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold text-zinc-900">
                                            {agent.name || "Agent"}
                                        </h1>
                                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    </div>
                                    {agent.company && (
                                        <p className="text-zinc-500 font-medium">{agent.company}</p>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                                        <div className="text-2xl font-bold text-blue-600">{agent._count.properties}</div>
                                        <div className="text-xs text-zinc-500 font-medium">Listings</div>
                                    </div>
                                    <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                        <div className="text-2xl font-bold text-emerald-600">{agent.properties.length}</div>
                                        <div className="text-xs text-zinc-500 font-medium">Available</div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3 border-t pt-6">
                                    <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">Contact Information</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-zinc-600">
                                            <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                <Mail className="h-4 w-4 text-zinc-500" />
                                            </div>
                                            <span className="text-sm">{agent.email}</span>
                                        </div>

                                        {agent.phone && (
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                    <Phone className="h-4 w-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm">{agent.phone}</span>
                                            </div>
                                        )}

                                        {agent.address && (
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                    <MapPin className="h-4 w-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm">{agent.address}</span>
                                            </div>
                                        )}

                                        {agent.licenseNumber && (
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                    <Shield className="h-4 w-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm">License: {agent.licenseNumber}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 text-zinc-600">
                                            <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                <Calendar className="h-4 w-4 text-zinc-500" />
                                            </div>
                                            <span className="text-sm">Member since {memberSince}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Button */}
                                <Button
                                    className="w-full mt-6 h-12 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25"
                                    asChild
                                >
                                    <a href={`mailto:${agent.email}`}>
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Contact Agent
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Properties Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900">Properties by {agent.name?.split(' ')[0] || 'Agent'}</h2>
                                <p className="text-zinc-500 mt-1">
                                    Browse all available listings from this agent
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-zinc-100">
                                <Home className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-semibold text-zinc-700">{agent.properties.length} properties</span>
                            </div>
                        </div>

                        {agent.properties.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                    <Building2 className="h-10 w-10 text-zinc-400" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">No listings available</h3>
                                <p className="text-zinc-500 mb-8 max-w-md">
                                    This agent doesn't have any available properties at the moment. Check back later!
                                </p>
                                <Button asChild variant="outline" className="rounded-full px-6">
                                    <Link href="/properties">
                                        Browse All Properties
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2">
                                {agent.properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
