"use client"

import { useFormState } from "react-dom"
import { register } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterAgentForm() {
    const [state, dispatch] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state === "Success") {
            router.push("/auth/login?registered=true&agent=true")
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">Agent Registration</CardTitle>
                <CardDescription>
                    Complete all fields to register as a verified real estate agent. This helps us maintain platform integrity and build trust with clients.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form action={dispatch} className="space-y-4">
                    {/* Hidden field to set role as AGENT */}
                    <input type="hidden" name="role" value="AGENT" />

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input id="name" name="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="phone">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <Input id="phone" name="phone" type="tel" placeholder="+254 712 345 678" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input id="email" name="email" type="email" placeholder="agent@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <Input id="password" name="password" type="password" required minLength={6} placeholder="Minimum 6 characters" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="company">
                                Company/Agency Name <span className="text-red-500">*</span>
                            </label>
                            <Input id="company" name="company" type="text" placeholder="ABC Realty Ltd" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="licenseNumber">
                                License Number <span className="text-red-500">*</span>
                            </label>
                            <Input id="licenseNumber" name="licenseNumber" type="text" placeholder="REA/12345" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="idNumber">
                            National ID / Business Registration Number <span className="text-red-500">*</span>
                        </label>
                        <Input id="idNumber" name="idNumber" type="text" placeholder="12345678 or BN/2024/12345" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="address">
                            Physical Business Address <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            id="address"
                            name="address"
                            placeholder="Full business address including street, city, and postal code"
                            required
                            className="min-h-[80px]"
                        />
                    </div>

                    {/* Display error message if state is not success and not undefined */}
                    {state && state !== "Success" && (
                        <p className="text-sm text-red-500">{state}</p>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                            <strong>Verification Notice:</strong> All agent applications are subject to verification. You'll receive confirmation within 24-48 hours after review.
                        </p>
                    </div>

                    <Button className="w-full" type="submit" size="lg">Create Agent Account</Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-gray-500 w-full">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline font-semibold">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
