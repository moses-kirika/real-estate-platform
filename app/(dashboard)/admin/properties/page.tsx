import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, ExternalLink } from "lucide-react"
import { deletePropertyAction } from "@/actions/admin"
import Link from "next/link"

export default async function AdminPropertiesPage() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") redirect("/dashboard")

    const properties = await db.property.findMany({
        include: {
            owner: {
                select: { name: true, email: true }
            }
        },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Property Management</h2>
                <p className="text-muted-foreground">
                    View and manage all property listings.
                </p>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/properties/${property.id}`} className="hover:underline flex items-center gap-1">
                                        {property.title}
                                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span>{property.owner.name}</span>
                                        <span className="text-xs text-muted-foreground">{property.owner.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>${Number(property.price).toLocaleString()}</TableCell>
                                <TableCell>{property.status}</TableCell>
                                <TableCell className="text-right">
                                    <form action={deletePropertyAction.bind(null, property.id)}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
