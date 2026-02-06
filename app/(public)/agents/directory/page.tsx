export const dynamic = "force-dynamic";

import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Building2,
    CheckCircle,
    MapPin,
    Shield,
    ArrowRight,
    Users,
    Search
} from "lucide-react"

export default async function AgentsDirectoryPage() {
    // Get all verified agents with their property count
    const agents = await db.user.findMany({
        where: {
            role: "AGENT"
        },
        select: {
            id: true,
            name: true,
            email: true,
            company: true,
            address: true,
            badgeLevel: true,
            createdAt: true,
            _count: {
                select: {
                    properties: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-primary text-sm font-semibold">Find Your Agent</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-foreground mb-4">
                        Our Verified Agents
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect with trusted real estate professionals who can help you find your dream property
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-12 p-6 bg-card rounded-2xl shadow-sm border border-border">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{agents.length}</div>
                        <div className="text-sm text-muted-foreground">Verified Agents</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-border" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">
                            {agents.reduce((sum, agent) => sum + agent._count.properties, 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Listings</div>
                    </div>
                </div>

                {agents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-card rounded-3xl border border-border shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold font-serif text-foreground mb-3">No agents yet</h3>
                        <p className="text-muted-foreground mb-8 max-w-md text-lg">
                            Be the first to join our platform and start listing properties!
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href="/auth/register-agent">
                                Become an Agent
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {agents.map((agent) => (
                            <Link
                                key={agent.id}
                                href={`/agents/${agent.id}`}
                                className="group"
                            >
                                <Card className="h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/20 flex-shrink-0">
                                                {agent.name?.charAt(0).toUpperCase() || agent.email.charAt(0).toUpperCase()}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                                                        {agent.name || "Agent"}
                                                    </h3>
                                                    {agent.badgeLevel === "GOLD" ? (
                                                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                                            <Shield className="h-3 w-3 mr-1 fill-amber-700" />
                                                            GOLD
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border border-zinc-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                                            <CheckCircle className="h-3 w-3 mr-1 fill-zinc-700" />
                                                            VERIFIED
                                                        </Badge>
                                                    )}
                                                </div>

                                                {agent.company && (
                                                    <p className="text-sm text-muted-foreground truncate mb-2">{agent.company}</p>
                                                )}

                                                {agent.address && (
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
                                                        <MapPin className="h-3 w-3" />
                                                        <span className="truncate">{agent.address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Building2 className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium">{agent._count.properties} listings</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Profile
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center p-8 bg-primary rounded-3xl text-primary-foreground">
                    <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">Are you a real estate professional?</h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                        Join our network of verified agents and start growing your business today.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="rounded-full px-8"
                    >
                        <Link href="/auth/register-agent">
                            Become an Agent
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
