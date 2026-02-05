import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { UserManagement } from "./user-management"

export default async function AdminUsersPage() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") redirect("/dashboard")

    const users = await db.user.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-serif font-bold tracking-tight text-primary">User Management</h2>
                <p className="text-muted-foreground">
                    View and manage all registered users, verify agents, and update account details.
                </p>
            </div>

            <UserManagement users={users} />
        </div>
    )
}
