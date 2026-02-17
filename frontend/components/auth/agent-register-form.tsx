"use client"

import { useFormState } from "react-dom"
import { register } from "@backend/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ShieldCheck, Home, Briefcase } from "lucide-react"

export default function AgentRegisterForm() {
    const [state, dispatch] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state === "Success") {
            router.push("/auth/login?registered=true&type=agent")
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-2xl border-zinc-200 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-8 text-center">
                <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-4">
                    <div className="bg-white text-primary p-2 rounded-lg">
                        <Home className="h-6 w-6" />
                    </div>
                    <span className="font-serif text-3xl font-bold tracking-tight text-white">Rafiki</span>
                </Link>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-2xl mb-4">
                    <Briefcase className="w-9 h-9 text-secondary" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Join Our Agent Network</h2>
                <p className="text-white/90 text-sm">Grow your business with Kenya&apos;s premier property platform</p>
            </div>
            <CardHeader className="space-y-1 pt-8 px-8">
                <CardTitle className="text-3xl font-serif font-bold text-primary">Agent Registration</CardTitle>
                <CardDescription className="text-base">
                    Complete this form to join our elite network of verified real estate professionals
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <form action={dispatch} className="space-y-5">
                    {/* Hidden role input to force AGENT role */}
                    <input type="hidden" name="role" value="AGENT" />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="name">Full Name *</label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700" htmlFor="email">Professional Email *</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="agent@example.com"
                                className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700" htmlFor="phone">Phone Number *</label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+254 700 000 000"
                                className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700" htmlFor="company">Agency / Company Name *</label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Your agency or company name"
                                className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700" htmlFor="licenseNumber">Real Estate License No. *</label>
                            <Input
                                id="licenseNumber"
                                name="licenseNumber"
                                type="text"
                                placeholder="RE-123456"
                                className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="address">Physical Business Address *</label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Your business address"
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="password">Create a Secure Password *</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Minimum 6 characters"
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20 space-y-3">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                                Your account will be manually verified by our team. Please ensure all information matches your professional identification and licenses.
                            </p>
                        </div>
                    </div>

                    {state && state !== "Success" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-sm text-red-600">{state}</p>
                        </div>
                    )}

                    <Button
                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold text-base shadow-md transition-all hover:shadow-lg"
                        type="submit"
                    >
                        Submit Application
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="bg-zinc-50 border-t px-8 py-6">
                <p className="text-sm text-center text-zinc-600 w-full">
                    Already an agent?{" "}
                    <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                        Sign in to your panel
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
