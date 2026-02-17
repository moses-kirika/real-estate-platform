import Link from "next/link"
import { Home as HomeIcon } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-zinc-50 border-t py-12">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center justify-center md:justify-start space-x-2">
                            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                                <HomeIcon className="h-5 w-5" />
                            </div>
                            <span className="font-serif text-2xl font-bold tracking-tight text-primary">Rafiki</span>
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-xs">Your trusted partner in Kenyan real estate. Verified listings, local expertise, zero shortcuts.</p>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-zinc-600">
                        <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
                        <Link href="/agents" className="hover:text-primary transition-colors">Agents</Link>
                        <Link href="/auth/register-agent" className="hover:text-primary transition-colors">List with Us</Link>
                    </div>
                    <p className="text-zinc-400 text-xs">© {new Date().getFullYear()} Rafiki Real Estate Limited. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
