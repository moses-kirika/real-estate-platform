import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, TrendingUp, Users, Shield, CheckCircle, Star, ArrowRight, MessageSquare, BarChart3, Zap, Home as HomeIcon } from "lucide-react"

export default function AgentsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1973"
                        alt="Professional Real Estate Office"
                        fill
                        priority
                        className="object-cover opacity-40 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                </div>

                <div className="container relative z-20 px-4 md:px-6">
                    <div className="max-w-4xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full border border-secondary/30 backdrop-blur-sm">
                            <Star className="h-4 w-4 text-secondary fill-secondary" />
                            <span className="text-secondary text-sm font-bold uppercase tracking-widest">Kenya&apos;s Most Trusted Network</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl font-serif font-black tracking-tight text-white sm:text-7xl md:text-8xl leading-tight">
                                Grow With <br />
                                <span className="text-secondary">Rafiki Real Estate</span>
                            </h1>
                            <p className="max-w-[700px] text-zinc-100 md:text-2xl text-lg font-medium">
                                Join an elite collective of verified Kenyan agents. Leverage local expertise, premium tools, and a brand that homeowners trust.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="h-16 px-10 text-lg bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-xl rounded-2xl transition-all" asChild>
                                <Link href="/auth/register-agent" className="flex items-center gap-2">
                                    List With Us Today
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" className="h-16 px-10 text-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-2xl" asChild>
                                <Link href="/agents/directory">Our Professional Directory</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Stats */}
            <section className="bg-zinc-50 border-y border-zinc-200 py-12">
                <div className="container px-4">
                    <div className="flex flex-wrap justify-between gap-8 md:gap-16">
                        <div className="space-y-1">
                            <p className="text-4xl font-serif font-bold text-primary">500+</p>
                            <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Licensed Agents</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-serif font-bold text-primary">10K+</p>
                            <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Verified Properties</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-serif font-bold text-primary">Ksh 5B+</p>
                            <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Market Exposure</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-serif font-bold text-primary">47</p>
                            <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Counties Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white relative">
                <div className="container px-4">
                    <div className="max-w-4xl mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-primary">Our Partnership <br />Process is Simple</h2>
                        <p className="text-xl text-muted-foreground">The most transparent way to list and sell property in Kenya.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Apply & Verify", desc: "Submit your professional credentials. We verify every agent to maintain platform integrity.", step: "01" },
                            { title: "List Your Inventory", desc: "Access our premium dashboard to showcase your properties with high-res media.", step: "02" },
                            { title: "Connect & Close", desc: "Receive qualified inquiries directly via WhatsApp and our secure dashboard.", step: "03" }
                        ].map((step) => (
                            <div key={step.step} className="space-y-6">
                                <div className="text-6xl font-serif font-black text-zinc-100">{step.step}</div>
                                <h3 className="text-2xl font-bold text-primary">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-primary text-white">
                <div className="container px-4">
                    <div className="mb-16 space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold">Why Top Agents <br />Choose Rafiki</h2>
                        <p className="text-zinc-400 text-lg">We provide the infrastructure so you can focus on building relationships.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Verified Badger", icon: Shield, desc: "Gain instant credibility with our 'Verified Agent' status on every listing." },
                            { title: "WhatsApp Direct", icon: MessageSquare, desc: "Direct integration with Kenya's most popular communication tool." },
                            { title: "Market Data", icon: BarChart3, desc: "Access HassConsult and market-leading data insights for your clients." },
                            { title: "Unlimited Reach", icon: TrendingUp, desc: "Your listings pushed to professional networks across East Africa." },
                            { title: "Legal Support", icon: CheckCircle, desc: "Standardized templates for ease of transaction and legal security." },
                            { title: "Agent Community", icon: Users, desc: "Join a network of top-tier professionals for co-listing opportunities." }
                        ].map((benefit) => (
                            <Card key={benefit.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                                        <benefit.icon className="h-6 w-6 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{benefit.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
