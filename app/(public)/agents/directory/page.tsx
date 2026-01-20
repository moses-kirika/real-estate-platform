import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Building2,
    CheckCircle,
    MapPin,
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-700 text-sm font-semibold">Find Your Agent</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
                        Our Verified Agents
                    </h1>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                        Connect with trusted real estate professionals who can help you find your dream property
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="flex justify-center gap-8 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{agents.length}</div>
                        <div className="text-sm text-zinc-500">Verified Agents</div>
                    </div>
                    <div className="w-px bg-zinc-200" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600">
                            {agents.reduce((sum, agent) => sum + agent._count.properties, 0)}
                        </div>
                        <div className="text-sm text-zinc-500">Total Listings</div>
                    </div>
                </div>

                {agents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-3">No agents yet</h3>
                        <p className="text-zinc-500 mb-8 max-w-md text-lg">
                            Be the first to join our platform and start listing properties!
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8">
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
                                <Card className="h-full overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                                                {agent.name?.charAt(0).toUpperCase() || agent.email.charAt(0).toUpperCase()}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-lg text-zinc-900 group-hover:text-blue-600 transition-colors truncate">
                                                        {agent.name || "Agent"}
                                                    </h3>
                                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0 flex-shrink-0">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Verified
                                                    </Badge>
                                                </div>

                                                {agent.company && (
                                                    <p className="text-sm text-zinc-500 truncate mb-2">{agent.company}</p>
                                                )}

                                                {agent.address && (
                                                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                                                        <MapPin className="h-3 w-3" />
                                                        <span className="truncate">{agent.address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                                            <div className="flex items-center gap-2 text-zinc-600">
                                                <Building2 className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{agent._count.properties} listings</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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
                <div className="mt-16 text-center p-8 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Are you a real estate professional?</h2>
                    <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                        Join our network of verified agents and start growing your business today.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400"
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
