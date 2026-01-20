import Link from "next/link"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Home, User } from "lucide-react"
import { signOutAction } from "@/actions/auth"

export default async function Navbar() {
    const session = await auth()
    const user = session?.user

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Home className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">RealEstate</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/properties" className="transition-colors hover:text-foreground text-foreground/80">
                        Properties
                    </Link>
                    <Link href="/agents" className="transition-colors hover:text-foreground text-foreground/80">
                        Agents
                    </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <span className="text-sm text-muted-foreground hidden md:inline-block">
                                Hello, {user.name || "User"}
                            </span>
                            <form action={signOutAction}>
                                <Button variant="ghost" size="sm">Sign Out</Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/auth/login">Log In</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/auth/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
