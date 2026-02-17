import { auth } from "@backend/auth"
import { getAgentAnalytics } from "@backend/actions/analytics"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Handshake, Mail, Home, TrendingUp, Calendar } from "lucide-react"
import { formatCurrency } from "@frontend/lib/utils"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AgentAnalyticsPage() {
    const session = await auth()
    if (!session || (session.user?.role !== "AGENT" && session.user?.role !== "ADMIN")) {
        redirect("/dashboard")
    }

    const analytics = await getAgentAnalytics()

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                <p className="text-muted-foreground">Track your progress and performance.</p>
            </div>

            {/* Top Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-white to-sky-50 border-sky-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">Earnings from deals</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Deals Completed</CardTitle>
                        <Handshake className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.transactionCount}</div>
                        <p className="text-xs text-muted-foreground">Sales and rentals</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-orange-50 border-orange-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                        <Mail className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.inquiryCount}</div>
                        <p className="text-xs text-muted-foreground">Potential client reach</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-indigo-50 border-indigo-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <Home className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.propertyCount}</div>
                        <p className="text-xs text-muted-foreground">Currently on market</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="md:col-span-4 shadow-sm border-zinc-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-sky-500" />
                            Revenue Trend
                        </CardTitle>
                        <CardDescription>Visualizing your earnings over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnalyticsCharts data={analytics.monthlyData} />
                    </CardContent>
                </Card>
                <Card className="md:col-span-3 shadow-sm border-zinc-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-emerald-500" />
                            Recent Deals
                        </CardTitle>
                        <CardDescription>Your latest closed transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.recentTransactions.length > 0 ? (
                                analytics.recentTransactions.map((tx: any) => (
                                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-100 transition-hover hover:bg-zinc-100">
                                        <div>
                                            <p className="text-sm font-semibold">{tx.type} Deal</p>
                                            <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-emerald-600">+{formatCurrency(Number(tx.amount))}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    No transactions yet.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inquiries Section */}
            <Card className="shadow-sm border-zinc-100">
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                    <CardDescription>Keep track of potential leads from your listings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {analytics.recentInquiries.map((inquiry: any) => (
                            <div key={inquiry.id} className="p-4 rounded-xl border border-zinc-100 bg-white shadow-sm ring-1 ring-zinc-50 transition-all hover:shadow-md hover:border-sky-100">
                                <p className="text-sm font-semibold text-zinc-900 line-clamp-1">{inquiry.property.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">From: {inquiry.guestName || "Authenticated User"}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-medium">New Lead</span>
                                    <span className="text-[10px] text-zinc-400">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                        {analytics.recentInquiries.length === 0 && (
                            <div className="col-span-full py-10 text-center text-muted-foreground">
                                No inquiries received yet.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
