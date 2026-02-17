import { auth } from "@backend/auth"
import { db } from "@backend/lib/db"
import { redirect } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { PropertyRow } from "@/components/property-row"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    User,
    Mail,
    Calendar,
    Bookmark,
    MessageSquare,
    ArrowLeft,
    Home
} from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/auth/login")
    }

    if (session.user.role === "AGENT") {
        redirect("/agent")
    }

    if (session.user.role === "ADMIN") {
        redirect("/admin")
    }

    // Get user details
    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
        }
    })

    if (!user) {
        redirect("/auth/login")
    }

    // Get saved properties
    const savedListings = await db.savedListing.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            property: {
                include: {
                    images: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    // Get user's inquiries
    const inquiries = await db.inquiry.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            property: {
                select: {
                    id: true,
                    title: true,
                    location: true,
                    images: {
                        take: 1
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-secondary/5">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                                My Profile
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">Member since {memberSince}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6">
                            <div className="text-center px-6 py-3 bg-primary/10 rounded-2xl border border-primary/20">
                                <div className="text-2xl font-bold text-primary">{savedListings.length}</div>
                                <div className="text-xs text-zinc-500 font-medium">Saved</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                                <div className="text-2xl font-bold text-secondary">{inquiries.length}</div>
                                <div className="text-xs text-zinc-500 font-medium">Inquiries</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="saved" className="w-full">
                    <TabsList className="bg-white border border-zinc-100 p-1 rounded-xl mb-6">
                        <TabsTrigger
                            value="saved"
                            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6"
                        >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Saved Properties
                        </TabsTrigger>
                        <TabsTrigger
                            value="inquiries"
                            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6"
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            My Inquiries
                        </TabsTrigger>
                    </TabsList>

                    {/* Saved Properties Tab */}
                    <TabsContent value="saved">
                        {savedListings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <Bookmark className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-3">No saved properties yet</h3>
                                <p className="text-zinc-500 mb-8 max-w-md text-lg">
                                    Start exploring properties and save your favorites to view them here.
                                </p>
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <Link href="/properties">
                                        <Home className="h-4 w-4 mr-2" />
                                        Browse Properties
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {savedListings.map((savedListing) => (
                                    <PropertyCard
                                        key={savedListing.id}
                                        property={savedListing.property}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Inquiries Tab */}
                    <TabsContent value="inquiries">
                        {inquiries.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-6">
                                    <MessageSquare className="h-10 w-10 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-3">No inquiries yet</h3>
                                <p className="text-zinc-500 mb-8 max-w-md text-lg">
                                    When you contact agents about properties, your inquiries will appear here.
                                </p>
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <Link href="/properties">
                                        <Home className="h-4 w-4 mr-2" />
                                        Browse Properties
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {inquiries.map((inquiry) => (
                                    <PropertyRow
                                        key={inquiry.id}
                                        property={inquiry.property as any}
                                        message={inquiry.message}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
