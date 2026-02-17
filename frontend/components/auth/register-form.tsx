"use client"

import { useFormState } from "react-dom"
import { register } from "@backend/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Home } from "lucide-react"

export default function RegisterForm() {
    const [state, dispatch] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state === "Success") {
            router.push("/auth/login?registered=true")
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-md border-zinc-200 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-8 text-center">
                <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-4">
                    <div className="bg-white text-primary p-2 rounded-lg">
                        <Home className="h-6 w-6" />
                    </div>
                    <span className="font-serif text-3xl font-bold tracking-tight text-white">Rafiki</span>
                </Link>
                <p className="text-white/90 text-sm mt-2">Join Kenya&apos;s premier property platform</p>
            </div>
            <CardHeader className="space-y-1 pt-8 px-8">
                <CardTitle className="text-3xl font-serif font-bold text-primary">Create Account</CardTitle>
                <CardDescription className="text-base">
                    Sign up to save properties and connect with agents
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <form action={dispatch} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="name">Full Name</label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            required
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700" htmlFor="password">Password</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            placeholder="Minimum 6 characters"
                            className="h-11 rounded-xl border-zinc-200 focus:border-primary focus:ring-primary"
                        />
                    </div>
                    {/* Display error message if state is not success and not undefined */}
                    {state && state !== "Success" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-sm text-red-600">{state}</p>
                        </div>
                    )}
                    <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold text-base shadow-md" type="submit">
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="bg-zinc-50 border-t px-8 py-6">
                <p className="text-sm text-center text-zinc-600 w-full">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
