import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, TrendingUp, Users, Shield, CheckCircle, Star, ArrowRight, MessageSquare, BarChart3, Zap } from "lucide-react"

export default function AgentsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Premium Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/properties/nairobi_luxury_villa.png"
                        alt="Premium Real Estate Agent"
                        fill
                        priority
                        className="object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                </div>

                <div className="container relative z-20 px-4 md:px-6">
                    <div className="max-w-4xl space-y-8 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                            <Star className="h-4 w-4 text-blue-400 fill-blue-400" />
                            <span className="text-blue-200 text-sm font-medium">Kenya&apos;s #1 Agent Platform</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-2xl leading-tight">
                                Elevate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400">Real Estate Career</span>
                            </h1>
                            <p className="max-w-[700px] text-zinc-300 md:text-2xl text-lg font-medium drop-shadow-md">
                                Join an elite network of verified agents. Access powerful tools, qualified leads, and unlimited growth potential.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:200ms]">
                            <Button size="lg" className="h-16 px-10 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-2xl" asChild>
                                <Link href="/auth/register-agent" className="flex items-center gap-2">
                                    Become an Agent
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" className="h-16 px-10 text-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-2xl" asChild>
                                <Link href="/agents/directory">Browse Our Agents</Link>
                            </Button>
                        </div>

                        {/* Trust Stats */}
                        <div className="flex flex-wrap gap-8 pt-8 animate-slide-up [animation-delay:400ms]">
                            <div className="text-center">
                                <p className="text-4xl font-extrabold text-white">500+</p>
                                <p className="text-zinc-400 text-sm">Active Agents</p>
                            </div>
                            <div className="w-px bg-white/20 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-4xl font-extrabold text-white">10K+</p>
                                <p className="text-zinc-400 text-sm">Properties Listed</p>
                            </div>
                            <div className="w-px bg-white/20 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-4xl font-extrabold text-white">Ksh 2B+</p>
                                <p className="text-zinc-400 text-sm">Total Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 bg-gradient-to-b from-background to-zinc-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Simple Process</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Get started in minutes and begin growing your real estate business today</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 to-purple-200" />

                        {/* Step 1 */}
                        <div className="relative group">
                            <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                    1
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Register & Verify</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Create your agent account with your professional credentials. Our team verifies your license within 24 hours.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative group">
                            <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                    2
                                </div>
                                <h3 className="text-2xl font-bold mb-3">List Properties</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Upload unlimited listings with photos, virtual tours, and detailed descriptions to attract buyers.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative group">
                            <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                    3
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Close Deals</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Connect with qualified leads, manage inquiries, and close deals faster with our integrated tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 px-4 bg-zinc-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Platform Features</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything You Need to Succeed</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Powerful tools designed specifically for real estate professionals</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="group border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Building2 className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Unlimited Listings</h3>
                                    <p className="text-muted-foreground mt-2">
                                        List as many properties as you want with high-quality images and detailed descriptions.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-transparent hover:border-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Users className="h-7 w-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Qualified Leads</h3>
                                    <p className="text-muted-foreground mt-2">
                                        Connect directly with serious buyers and renters through our smart matching system.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <BarChart3 className="h-7 w-7 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Analytics Dashboard</h3>
                                    <p className="text-muted-foreground mt-2">
                                        Track views, inquiries, and performance metrics all from one powerful dashboard.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-transparent hover:border-amber-200 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Shield className="h-7 w-7 text-amber-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Verified Platform</h3>
                                    <p className="text-muted-foreground mt-2">
                                        Build trust with verified agent badges and secure communication channels.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-transparent hover:border-pink-200 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageSquare className="h-7 w-7 text-pink-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Smart Messaging</h3>
                                    <p className="text-muted-foreground mt-2">
                                        Manage all client communications with instant notifications and message templates.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-transparent hover:border-cyan-200 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 space-y-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Zap className="h-7 w-7 text-cyan-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">Premium Exposure</h3>
                                    <p className="text-muted-foreground mt-2">
                                        Your properties reach thousands of potential buyers across Kenya with featured placements.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Success Stories</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by Top Agents</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">See what our agents have to say about their experience</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-zinc-50 to-white border-0 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    &quot;This platform has transformed my business. I&apos;ve closed more deals in the last 6 months than the entire previous year.&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                        JM
                                    </div>
                                    <div>
                                        <p className="font-bold">James Mwangi</p>
                                        <p className="text-sm text-muted-foreground">Senior Agent, Nairobi</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-zinc-50 to-white border-0 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    &quot;The analytics dashboard alone is worth it. I can see exactly what&apos;s working and optimize my listings accordingly.&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                                        AO
                                    </div>
                                    <div>
                                        <p className="font-bold">Amina Ochieng</p>
                                        <p className="text-sm text-muted-foreground">Property Consultant, Mombasa</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-zinc-50 to-white border-0 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    &quot;Finally, a platform that understands the Kenyan market. The lead quality is exceptional and the support team is amazing.&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        DK
                                    </div>
                                    <div>
                                        <p className="font-bold">David Kamau</p>
                                        <p className="text-sm text-muted-foreground">Real Estate Director, Kisumu</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-8 md:px-16 py-20 text-center text-white shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                                <CheckCircle className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm font-medium">Free to join • No hidden fees</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                                Ready to Grow Your Business?
                            </h2>
                            <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed">
                                Join Kenya&apos;s most successful real estate agents and take your career to the next level.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" className="h-16 px-12 text-lg bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]" asChild>
                                    <Link href="/auth/register-agent" className="flex items-center gap-2">
                                        Create Your Account
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>

                            <p className="text-sm text-zinc-500">
                                Already an agent?{" "}
                                <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                    Log in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
