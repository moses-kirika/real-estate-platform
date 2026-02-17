import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-12 px-4">
            <RegisterForm />
        </div>
    )
}
