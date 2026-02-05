import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getAgentAnalytics } from "@/actions/analytics"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Mail, TrendingUp, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export default async function AgentDashboardPage() {
    const session = await auth()
    if (!session || (session.user?.role !== "AGENT" && session.user?.role !== "ADMIN")) {
        redirect("/dashboard")
    }

    const analytics = await getAgentAnalytics()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-primary">Agent Dashboard</h2>
                    <p className="text-muted-foreground">Manage your listings and inquiries.</p>
                </div>
                <Link
                    href="/agent/analytics"
                    className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 group"
                >
                    View detailed analytics
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Listings</CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.propertyCount}</div>
                        <p className="text-xs text-muted-foreground">Total active properties</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Received Inquiries</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.inquiryCount}</div>
                        <p className="text-xs text-muted-foreground">Messages from potential buyers</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow bg-secondary/10 border-secondary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{formatCurrency(analytics.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">From closed deals</p>
                    </CardContent>
                </Card>
            </div>

            {/* Simple Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.recentInquiries.slice(0, 3).map((inquiry: any) => (
                                <div key={inquiry.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-medium">{inquiry.guestName || "User"}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{inquiry.property?.title || "Unknown Property"}</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                            {analytics.recentInquiries.length === 0 && (
                                <div className="text-center py-4 text-xs text-muted-foreground">No recent inquiries</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Latest Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.recentTransactions.slice(0, 3).map((tx: any) => (
                                <div key={tx.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-medium">{tx.type}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-600">{formatCurrency(Number(tx.amount))}</p>
                                </div>
                            ))}
                            {analytics.recentTransactions.length === 0 && (
                                <div className="text-center py-4 text-xs text-muted-foreground">No deals completed yet</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
