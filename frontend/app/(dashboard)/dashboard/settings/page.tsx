import { auth } from "@backend/auth"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProfileForm } from "./profile-form"

export default async function SettingsPage() {
    const session = await auth()

    if (!session?.user) return null

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />

            <div className="grid gap-6">
                <ProfileForm user={session.user} />

                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive font-bold">Danger Zone</CardTitle>
                        <CardDescription>
                            Permanently delete your account and all associated data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
