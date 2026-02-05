"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, User, Home, Settings, Mail, Bookmark, ShieldCheck, LogOut, TrendingUp } from "lucide-react"
import { signOutAction } from "@/actions/auth"

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    role?: string
}

export function Sidebar({ className, role }: SidebarProps) {
    const pathname = usePathname()

    const dashboardRoutes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-primary",
        },
    ]

    const agentRoutes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/agent",
            color: "text-primary",
        },
        {
            label: "My Listings",
            icon: Home,
            href: "/agent/properties",
            color: "text-secondary",
        },
        {
            label: "Inquiries (Received)",
            icon: Mail,
            href: "/agent/inquiries",
            color: "text-emerald-600",
        },
        {
            label: "Analytics",
            icon: TrendingUp,
            href: "/agent/analytics",
            color: "text-primary",
        },
    ]

    return (
        <div className={cn("pb-12 space-y-4", className)}>
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-serif font-bold tracking-tight text-primary">
                    Dashboard
                </h2>
                <div className="space-y-1">
                    {/* Only show generic dashboard link for regular users */}
                    {(!role || (role !== "AGENT" && role !== "ADMIN")) && dashboardRoutes.map((route) => (
                        <Button
                            key={route.href}
                            variant={pathname === route.href ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={route.href}>
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </Link>
                        </Button>
                    ))}

                    {role === "AGENT" && (
                        <>
                            <div className="px-4 py-2 mt-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                                Agent Panel
                            </div>
                            {agentRoutes.map((route) => (
                                <Button
                                    key={route.href}
                                    variant={pathname === route.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={route.href}>
                                        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                        {route.label}
                                    </Link>
                                </Button>
                            ))}
                        </>
                    )}
                    {role === "ADMIN" && (
                        <>
                            <div className="px-4 py-2 mt-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                                Administration
                            </div>
                            <Button
                                variant={pathname === "/admin" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href="/admin">
                                    <LayoutDashboard className="h-5 w-5 mr-3" />
                                    Analytics
                                </Link>
                            </Button>
                            <Button
                                variant={pathname === "/admin/users" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href="/admin/users">
                                    <User className="h-5 w-5 mr-3" />
                                    Users
                                </Link>
                            </Button>
                            <Button
                                variant={pathname === "/admin/properties" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href="/admin/properties">
                                    <Home className="h-5 w-5 mr-3" />
                                    Properties
                                </Link>
                            </Button>
                            <Button
                                variant={pathname === "/admin/content" ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href="/admin/content">
                                    <Bookmark className="h-5 w-5 mr-3" />
                                    Content
                                </Link>
                            </Button>
                        </>
                    )}

                    <div className="pt-4 mt-4 border-t">
                        <Button
                            variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
                            className="w-full justify-start text-zinc-500 hover:text-zinc-900"
                            asChild
                        >
                            <Link href="/dashboard/settings">
                                <Settings className="h-5 w-5 mr-3" />
                                Settings
                            </Link>
                        </Button>
                        <form action={signOutAction} className="mt-1">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-zinc-500 hover:text-red-600 hover:bg-red-50"
                                type="submit"
                            >
                                <LogOut className="h-5 w-5 mr-3" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
