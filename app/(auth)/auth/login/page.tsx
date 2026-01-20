import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-12">
            <LoginForm />
        </div>
    )
}
