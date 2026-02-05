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
    params: { id: string }
}) {
    const { id } = params

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
            bio: true,
            badgeLevel: true,
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
        <div className="min-h-screen bg-[#faf9f6]">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Link */}
                <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Directory</span>
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Agent Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 overflow-hidden border-0 shadow-2xl rounded-3xl">
                            {/* Header Background */}
                            <div className="h-32 bg-primary relative">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            </div>

                            <CardContent className="p-8 pt-0 -mt-16 relative">
                                {/* Avatar */}
                                <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl font-serif font-bold text-primary border-4 border-white mb-6">
                                    {agent.name?.charAt(0).toUpperCase() || agent.email.charAt(0).toUpperCase()}
                                </div>

                                {/* Name and Company */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-serif font-bold text-primary">
                                            {agent.name || "Professional Agent"}
                                        </h1>
                                        {agent.badgeLevel === "GOLD" ? (
                                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border border-amber-200 font-black px-4 py-1.5 rounded-full shadow-sm">
                                                <Shield className="h-3.5 w-3.5 mr-2 fill-amber-700" />
                                                GOLD PARTNER
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border border-zinc-200 font-bold px-3 py-1 rounded-full">
                                                <CheckCircle className="h-3 w-3 mr-1.5 fill-zinc-700" />
                                                VERIFIED
                                            </Badge>
                                        )}
                                    </div>
                                    {agent.company && (
                                        <p className="text-zinc-500 font-serif italic text-lg">{agent.company}</p>
                                    )}
                                </div>

                                {/* About / Bio */}
                                {agent.bio && (
                                    <div className="mb-8 p-6 bg-white rounded-3xl border border-zinc-100 shadow-inner">
                                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">About Me</h3>
                                        <p className="text-zinc-600 leading-relaxed italic">
                                            "{agent.bio}"
                                        </p>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="text-center p-3 sm:p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="text-xl sm:text-2xl font-serif font-black text-primary">{agent._count.properties}</div>
                                        <div className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Total Listings</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <div className="text-xl sm:text-2xl font-serif font-black text-emerald-700">{agent.properties.length}</div>
                                        <div className="text-[9px] sm:text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Live Now</div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-4 border-t border-zinc-100 pt-8">
                                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Official Credentials</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-zinc-600 group">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors text-zinc-400 group-hover:text-primary">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-medium">{agent.email}</span>
                                        </div>

                                        {agent.phone && (
                                            <div className="flex items-center gap-4 text-zinc-600 group">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors text-zinc-400 group-hover:text-primary">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-medium">{agent.phone}</span>
                                            </div>
                                        )}

                                        {agent.licenseNumber && (
                                            <div className="flex items-center gap-4 text-zinc-600 group">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors text-zinc-400 group-hover:text-primary">
                                                    <Shield className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-medium">Licensed by Estate Agents Board <br /><span className="text-zinc-400">{agent.licenseNumber}</span></span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-zinc-600 group">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors text-zinc-400 group-hover:text-primary">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-medium">Partner since {memberSince}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Primary */}
                                <Button
                                    className="w-full mt-8 h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 gap-3"
                                    asChild
                                >
                                    <a href={`https://wa.me/${agent.phone?.replace('+', '') || '254700000000'}?text=Hello, I'm interested in viewing your listings on Rafiki Real Estate.`} target="_blank" rel="noopener noreferrer">
                                        <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2c-5.517 0-9.993 4.477-9.993 9.994 0 1.763.459 3.42 1.258 4.864l-1.334 4.872 4.985-1.308c1.399.761 2.997 1.2 4.69 1.2 5.518 0 9.996-4.477 9.996-9.995 0-5.516-4.478-9.993-9.996-9.993zm-4.329 13.974c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2z" /></svg>
                                        WhatsApp Inquiries
                                    </a>
                                </Button>
                                <p className="text-center text-[10px] text-zinc-400 mt-4 font-bold uppercase tracking-widest">Typical response time: Under 1 hour</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Properties Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-end justify-between mb-12 border-b border-zinc-200 pb-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Listings by {agent.name?.split(' ')[0] || 'Agent'}</h2>
                                <p className="text-zinc-500 text-lg">
                                    Hand-picked residential and commercial opportunities.
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-zinc-100">
                                <Home className="h-5 w-5 text-secondary" />
                                <span className="text-sm font-serif font-black text-primary">{agent.properties.length} Properties</span>
                            </div>
                        </div>

                        {agent.properties.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 px-8 text-center bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
                                <div className="w-24 h-24 rounded-full bg-zinc-50 flex items-center justify-center mb-8">
                                    <Building2 className="h-10 w-10 text-zinc-300" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Currently updating portfolio</h3>
                                <p className="text-zinc-500 mb-10 max-w-sm text-lg">
                                    This agent is currently preparing new exclusive listings. Browse our main directory in the meantime.
                                </p>
                                <Button asChild className="rounded-2xl px-10 h-14 text-lg font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                                    <Link href="/properties">
                                        Main Listing Directory
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-12 sm:grid-cols-2">
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
