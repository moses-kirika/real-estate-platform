import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                                {user.name || "User"}
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
                            <div className="text-center px-6 py-3 bg-blue-50 rounded-2xl">
                                <div className="text-2xl font-bold text-blue-600">{savedListings.length}</div>
                                <div className="text-xs text-zinc-500 font-medium">Saved</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-purple-50 rounded-2xl">
                                <div className="text-2xl font-bold text-purple-600">{inquiries.length}</div>
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
                            className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6"
                        >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Saved Properties
                        </TabsTrigger>
                        <TabsTrigger
                            value="inquiries"
                            className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6"
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            My Inquiries
                        </TabsTrigger>
                    </TabsList>

                    {/* Saved Properties Tab */}
                    <TabsContent value="saved">
                        {savedListings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                                    <Bookmark className="h-10 w-10 text-blue-600" />
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
                            <div className="space-y-4">
                                {inquiries.map((inquiry) => (
                                    <Card key={inquiry.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                {/* Property Image */}
                                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                                                    {inquiry.property.images[0] ? (
                                                        <img
                                                            src={inquiry.property.images[0].url}
                                                            alt={inquiry.property.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Home className="h-8 w-8 text-zinc-300" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Inquiry Details */}
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        href={`/properties/${inquiry.property.id}`}
                                                        className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors line-clamp-1"
                                                    >
                                                        {inquiry.property.title}
                                                    </Link>
                                                    <p className="text-sm text-zinc-500 mb-2">{inquiry.property.location}</p>
                                                    <p className="text-sm text-zinc-700 line-clamp-2">{inquiry.message}</p>
                                                </div>

                                                {/* Date */}
                                                <div className="text-xs text-zinc-400 whitespace-nowrap">
                                                    {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
