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
import { Trash2, Plus } from "lucide-react"
import { createTestimonialAction, deleteTestimonialAction } from "@/actions/admin"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function AdminContentPage() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") redirect("/dashboard")

    // Note: This will error until prisma generate succeeds and Testimonial model is recognized
    // We are proceeding assuming user will fix the environment
    const testimonials = await db.testimonial.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
                    <p className="text-muted-foreground">
                        Manage website testimonials and other content.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Testimonial</DialogTitle>
                        </DialogHeader>
                        <form
                            action={createTestimonialAction}
                            className="space-y-4 py-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required placeholder="Client name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" name="role" required placeholder="e.g. Home Buyer" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rating">Rating (1-5)</Label>
                                <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue="5" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Message</Label>
                                <Textarea id="content" name="content" required placeholder="Client feedback..." />
                            </div>
                            <Button type="submit" className="w-full">Save Testimonial</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell className="font-medium">{t.name}</TableCell>
                                <TableCell>{t.role}</TableCell>
                                <TableCell>{t.rating}/5</TableCell>
                                <TableCell className="max-w-[300px] truncate" title={t.content}>
                                    {t.content}
                                </TableCell>
                                <TableCell className="text-right">
                                    <form action={deleteTestimonialAction.bind(null, t.id)}>
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
                        {testimonials.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No testimonials yet. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
