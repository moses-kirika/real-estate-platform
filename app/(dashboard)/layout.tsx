import Link from "next/link"
import { Sidebar } from "@/components/dashboard/sidebar"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-100 dark:bg-gray-900 border-r">
                <div className="p-6">
                    <Link href="/" className="flex items-center space-x-2 mb-6">
                        <span className="font-bold text-xl">RealEstate</span>
                    </Link>
                    <Sidebar role={session?.user?.role} />
                </div>
            </div>
            <main className="md:pl-72 flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
