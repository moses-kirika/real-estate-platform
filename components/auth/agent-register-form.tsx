"use client"

import { useFormState } from "react-dom"
import { register } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ShieldCheck, UserCheck, Zap } from "lucide-react"

export default function AgentRegisterForm() {
    const [state, dispatch] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state === "Success") {
            router.push("/auth/login?registered=true&type=agent")
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-lg border-2 border-blue-100 shadow-2xl">
            <CardHeader className="space-y-1 bg-blue-50/50 pb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-extrabold tracking-tight">Agent Registration</CardTitle>
                <CardDescription className="text-base">
                    Join our elite network of verified real estate professionals.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 pt-8">
                <form action={dispatch} className="space-y-5">
                    {/* Hidden role input to force AGENT role */}
                    <input type="hidden" name="role" value="AGENT" />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold leading-none" htmlFor="name">Full Name</label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold leading-none" htmlFor="email">Professional Email</label>
                            <Input id="email" name="email" type="email" placeholder="john@agent.com" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold leading-none" htmlFor="phone">Phone Number</label>
                            <Input id="phone" name="phone" type="tel" placeholder="+254 700 000000" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold leading-none" htmlFor="company">Agency / Company Name</label>
                            <Input id="company" name="company" type="text" placeholder="Premium Realty Kenya" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold leading-none" htmlFor="licenseNumber">Real Estate License No.</label>
                            <Input id="licenseNumber" name="licenseNumber" type="text" placeholder="RE-123456" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold leading-none" htmlFor="address">Physical Business Address</label>
                        <Input id="address" name="address" type="text" placeholder="123 Business Park, Nairobi" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold leading-none" htmlFor="password">Create a Secure Password</label>
                        <Input id="password" name="password" type="password" className="h-12 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl" required minLength={6} />
                    </div>

                    <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 space-y-3">
                        <div className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                            <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                Account subject to manual verification. Please ensure your name matches your professional identification.
                            </p>
                        </div>
                    </div>

                    {state && state !== "Success" && (
                        <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">{state}</p>
                    )}

                    <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 rounded-xl transition-all hover:scale-[1.01]" type="submit">
                        Apply to Join as Agent
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="pb-8">
                <p className="text-sm text-center text-zinc-500 w-full font-medium">
                    Already an agent?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
                        Sign in to Panel
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
