import Link from "next/link"
import { auth } from "@backend/auth"
import { Button } from "@/components/ui/button"
import { Home, User, Building2, Users, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { signOutAction } from "@backend/actions/auth"

export default async function Navbar() {
    const session = await auth()
    const user = session?.user

    const navLinks = [
        { href: "/properties", label: "Properties", icon: Building2 },
        { href: "/agents", label: "Agents", icon: Users },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4">
                {/* Mobile Menu */}
                <div className="lg:hidden mr-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-foreground/80">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader className="mb-8 text-left">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                                        <Home className="h-5 w-5" />
                                    </div>
                                    <span className="font-serif text-2xl font-bold text-primary">Rafiki</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                                    >
                                        <link.icon className="h-5 w-5" />
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-zinc-100 my-4" />
                                <Link
                                    href="/auth/register-agent"
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-secondary hover:bg-secondary/5 transition-all"
                                >
                                    <Building2 className="h-5 w-5" />
                                    List Your Property
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                        <Home className="h-5 w-5" />
                    </div>
                    <span className="hidden font-serif text-xl font-bold tracking-tight sm:inline-block">Rafiki</span>
                </Link>

                <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                        >
                            <link.icon className="h-4 w-4" />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href={user.role === "AGENT" ? "/agent" : user.role === "ADMIN" ? "/admin" : "/dashboard"}
                                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 hover:bg-primary/90 transition-all duration-300 ring-2 ring-primary/20"
                                title={user.role === "AGENT" || user.role === "ADMIN" ? "Dashboard" : "My Profile"}
                            >
                                <User className="h-5 w-5" />
                            </Link>
                            <form action={signOutAction}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden sm:inline-flex border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium ml-2"
                                >
                                    Sign Out
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button size="sm" asChild className="rounded-full px-6">
                                <Link href="/auth/login">Log In</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
