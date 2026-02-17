"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfileAction } from "@backend/actions/user"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface ProfileFormProps {
    user: {
        id?: string
        name?: string | null
        email?: string | null
    }
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setMessage(null)

        try {
            await updateProfileAction(formData)
            setMessage({ type: 'success', text: 'Profile updated successfully' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile. Email might be in use.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your public profile details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    {message && (
                        <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-destructive/10 text-destructive'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={user.name || ""}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user.email || ""}
                            required
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">
                            Changing your email may require you to sign in again.
                        </p>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
