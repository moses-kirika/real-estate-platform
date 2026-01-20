"use client"

import { useFormState } from "react-dom"
import { register } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterForm() {
    const [state, dispatch] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state === "Success") {
            router.push("/auth/login?registered=true")
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Create an account to save properties and contact agents.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form action={dispatch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="name">Name</label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" required minLength={6} />
                    </div>
                    {/* Display error message if state is not success and not undefined */}
                    {state && state !== "Success" && (
                        <p className="text-sm text-red-500">{state}</p>
                    )}
                    <Button className="w-full" type="submit">Create account</Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-gray-500 w-full">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
