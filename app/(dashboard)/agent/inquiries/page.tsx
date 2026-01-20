import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Home, Calendar, Reply, ExternalLink, User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function InquiriesPage() {
    const session = await auth()

    if (session?.user?.role === "USER") {
        redirect("/dashboard")
    }

    // Fetch inquiries for properties owned by the current user
    const inquiries = await db.inquiry.findMany({
        where: {
            property: {
                ownerId: session?.user?.id
            }
        },
        include: {
            property: true,
            user: { select: { name: true, email: true, image: true } }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Inquiries</h2>
                <p className="text-muted-foreground">
                    View messages from people interested in your listings.
                </p>
            </div>

            <div className="grid gap-6">
                {inquiries.map((inquiry) => {
                    const isRegistered = !!inquiry.user;
                    const contactEmail = inquiry.user?.email || inquiry.guestEmail || "";
                    const contactName = inquiry.user?.name || inquiry.guestName || "Interested Lead";

                    return (
                        <Card key={inquiry.id} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {contactName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                                            {contactName}
                                            {isRegistered ? (
                                                <Badge variant="secondary" className="text-xs font-normal">Registered</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-xs font-normal">Guest</Badge>
                                            )}
                                        </CardTitle>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(inquiry.createdAt).toLocaleString(undefined, {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground">Contact Email</label>
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <a href={`mailto:${contactEmail}`} className="hover:underline">
                                                {contactEmail}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground">Property Interest</label>
                                        <div className="flex items-center">
                                            <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                                            <Link href={`/properties/${inquiry.property.id}`} className="hover:underline hover:text-primary flex items-center gap-1 font-medium">
                                                {inquiry.property.title}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-lg text-sm border-l-4 border-primary">
                                    <h4 className="font-semibold text-xs text-muted-foreground mb-1">MESSAGE</h4>
                                    &quot;{inquiry.message}&quot;
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/10 p-4 flex justify-end">
                                <Button asChild size="sm">
                                    <a href={`mailto:${contactEmail}?subject=Re: Inquiry about ${inquiry.property.title}`}>
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply via Email
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            {inquiries.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed rounded-xl">
                    <Mail className="h-10 w-10 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-lg font-medium">No inquiries yet</h3>
                    <p className="text-muted-foreground">Your properties are waiting for their first leads.</p>
                </div>
            )}
        </div>
    )
}
