import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Plus, Edit } from "lucide-react"
import { DeletePropertyButton } from "@/components/delete-property-button"
import Link from "next/link"
import { CompleteDealButton } from "@/components/complete-deal-button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export default async function MyPropertiesPage() {
    const session = await auth()

    const properties = await db.property.findMany({
        where: {
            ownerId: session?.user?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
                    <p className="text-muted-foreground">
                        Manage your listed properties.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/agent/properties/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                    </Link>
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell className="font-medium">{property.title}</TableCell>
                                <TableCell>{property.location}</TableCell>
                                <TableCell>{formatCurrency(Number(property.price))}</TableCell>
                                <TableCell>
                                    <span className="capitalize">{property.status.toLowerCase()}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {property.status === "AVAILABLE" && (
                                            <CompleteDealButton
                                                propertyId={property.id}
                                                propertyTitle={property.title}
                                                defaultPrice={Number(property.price)}
                                            />
                                        )}
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/agent/properties/${property.id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <DeletePropertyButton id={property.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {properties.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No properties found. List your first property today!
                    </div>
                )}
            </div>
        </div>
    )
}
