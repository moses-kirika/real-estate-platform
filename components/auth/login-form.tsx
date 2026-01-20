"use client"


import { useFormState } from "react-dom"
import { authenticate } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"


export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)


    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* We use a standard HTML form element with the server action */}
                <form action={dispatch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                    <Button className="w-full" type="submit">Sign in</Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-gray-500 w-full">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="underline">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
