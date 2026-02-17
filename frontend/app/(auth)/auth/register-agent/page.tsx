import AgentRegisterForm from "@/components/auth/agent-register-form"

export default function AgentRegisterPage() {
    return (
        <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-12 px-4 bg-zinc-50/50">
            <AgentRegisterForm />
        </div>
    )
}
