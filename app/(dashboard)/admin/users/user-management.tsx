"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, CheckCircle, XCircle, ShieldCheck, Eye } from "lucide-react"
import {
    deleteUserAction,
    verifyUserAction,
    unverifyUserAction,
    updateUserEmailAction
} from "@/actions/admin"

interface User {
    id: string
    name: string | null
    email: string
    role: string
    verifiedAt: Date | null
    createdAt: Date
    // Agent specific fields
    phone?: string | null
    company?: string | null
    licenseNumber?: string | null
    address?: string | null
    idNumber?: string | null
}

export function UserManagement({ users }: { users: User[] }) {
    const [emailUpdateUser, setEmailUpdateUser] = useState<User | null>(null)
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
    const [viewDetailsAgent, setViewDetailsAgent] = useState<User | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    // Filter users
    const agents = users.filter(user => user.role === "AGENT")
    const regularUsers = users.filter(user => user.role !== "AGENT")

    return (
        <div className="space-y-6">
            <Tabs defaultValue="users" className="w-full">
                <TabsList className="bg-muted p-1 rounded-xl mb-6 w-full md:w-auto inline-flex">
                    <TabsTrigger value="users" className="px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        All Users ({regularUsers.length})
                    </TabsTrigger>
                    <TabsTrigger value="agents" className="px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        Agents ({agents.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <UserTable
                        users={regularUsers}
                        onEditEmail={(user) => {
                            setEmailUpdateUser(user)
                            setIsEmailDialogOpen(true)
                        }}
                        showRole
                    />
                </TabsContent>

                <TabsContent value="agents">
                    <UserTable
                        users={agents}
                        onEditEmail={(user) => {
                            setEmailUpdateUser(user)
                            setIsEmailDialogOpen(true)
                        }}
                        onViewDetails={(agent) => {
                            setViewDetailsAgent(agent)
                            setIsDetailsOpen(true)
                        }}
                        showVerification
                    />
                </TabsContent>
            </Tabs>

            {/* Email Edit Dialog */}
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Email Address</DialogTitle>
                    </DialogHeader>
                    {emailUpdateUser && (
                        <form
                            action={async (formData) => {
                                await updateUserEmailAction(formData)
                                setIsEmailDialogOpen(false)
                            }}
                            className="space-y-4 py-4"
                        >
                            <input type="hidden" name="userId" value={emailUpdateUser.id} />
                            <div className="space-y-2">
                                <Label htmlFor="email">New Email Address for {emailUpdateUser.name}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={emailUpdateUser.email}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Agent Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Agent Details: {viewDetailsAgent?.name}</DialogTitle>
                    </DialogHeader>
                    {viewDetailsAgent && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">Company/Agency</h4>
                                    <p className="font-medium text-foreground">{viewDetailsAgent.company || "Not provided"}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">License Number</h4>
                                    <p className="font-medium text-foreground">{viewDetailsAgent.licenseNumber || "Not provided"}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">Phone Number</h4>
                                    <p className="font-medium text-foreground">{viewDetailsAgent.phone || "Not provided"}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">ID Number</h4>
                                    <p className="font-medium text-foreground">{viewDetailsAgent.idNumber || "Not provided"}</p>
                                </div>
                                <div className="col-span-2">
                                    <h4 className="font-semibold text-muted-foreground mb-1">Address</h4>
                                    <p className="font-medium text-foreground">{viewDetailsAgent.address || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t flex justify-end">
                                {viewDetailsAgent.verifiedAt ? (
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1 px-3 py-1">
                                        <ShieldCheck className="h-4 w-4" />
                                        Verified Agent
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-zinc-500 gap-1 px-3 py-1">
                                        Verification Pending
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

function UserTable({
    users,
    onEditEmail,
    onViewDetails,
    showRole = false,
    showVerification = false
}: {
    users: User[],
    onEditEmail: (user: User) => void,
    onViewDetails?: (user: User) => void,
    showRole?: boolean,
    showVerification?: boolean
}) {
    return (
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-zinc-50/50 hover:bg-zinc-50/50">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        {showRole && <TableHead>Role</TableHead>}
                        {showVerification && <TableHead>Verification</TableHead>}
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{user.name || "Unnamed"}</span>
                                        {/* Mobile view details link */}
                                        {onViewDetails && (
                                            <button
                                                onClick={() => onViewDetails(user)}
                                                className="text-xs text-primary hover:underline text-left md:hidden mt-0.5"
                                            >
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            {showRole && (
                                <TableCell>
                                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                            )}
                            {showVerification && (
                                <TableCell>
                                    {user.verifiedAt ? (
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1">
                                            <ShieldCheck className="h-3 w-3" />
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-zinc-500 gap-1">
                                            Unverified
                                        </Badge>
                                    )}
                                </TableCell>
                            )}
                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {showVerification && onViewDetails && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onViewDetails(user)}
                                            className="text-primary hover:text-primary hover:bg-primary/10 hidden md:inline-flex"
                                            title="View Agent Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    )}

                                    {showVerification && (
                                        <form action={user.verifiedAt ? unverifyUserAction.bind(null, user.id) : verifyUserAction.bind(null, user.id)}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={user.verifiedAt ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50" : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"}
                                                title={user.verifiedAt ? "Revoke Verification" : "Verify Agent"}
                                            >
                                                {user.verifiedAt ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                            </Button>
                                        </form>
                                    )}

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEditEmail(user)}
                                        className="text-zinc-500 hover:text-primary hover:bg-primary/10"
                                        title="Edit Email"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>

                                    <form action={deleteUserAction.bind(null, user.id)}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            title="Delete User"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                No users found in this category.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
