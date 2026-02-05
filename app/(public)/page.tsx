import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { PropertyCard } from "@/components/property-card";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Home as HomeIcon } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  }
  const featuredProperties = await db.property.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }, // mock featured by latest
    include: { images: true }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2070"
            alt="Nairobi Skyline and Greenery"
            fill
            priority
            className="object-cover opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-serif font-black tracking-tight text-white sm:text-7xl md:text-8xl leading-[1.1]">
                Find Your Next <br />
                <span className="text-secondary">Premier Sanctuary.</span>
              </h1>
              <p className="max-w-[700px] text-zinc-100 md:text-2xl text-lg font-medium">
                Experience the pinnacle of Kenyan living. From the lush suburbs of Karen to the bustling energy of Westlands.
              </p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20">
              <form action="/properties" className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4">
                  <svg className="h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="query"
                    placeholder="Search by location, property type, or keyword..."
                    className="flex-1 px-4 h-14 text-zinc-900 placeholder:text-zinc-500 focus:outline-none bg-transparent text-lg"
                  />
                </div>
                <Button size="lg" className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg transition-all">
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-white text-sm font-medium">100+ Verified Listings</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-sm font-medium">Licensed Agents Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-primary">Nairobi&apos;s Finest Neighborhoods</h2>
            <p className="text-muted-foreground text-lg mt-4">Discover the unique character and charm of Kenya&apos;s premier locations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Kilimani", desc: "Cosmopolitan & Vibrant", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800" },
              { name: "Westlands", desc: "Corporate & Lifestyle Hub", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800" },
              { name: "Karen", desc: "Lush Suburbs & Private Estates", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
              { name: "Lavington", desc: "Upscale Residential Luxury", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" }
            ].map((area) => (
              <div key={area.name} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                <Image src={area.img} alt={area.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-serif font-bold">{area.name}</h3>
                  <p className="text-zinc-300 text-sm">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rafiki Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl space-y-12">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Authentic Local Expertise. <br /><span className="text-secondary">No Templates. No Shortcuts.</span></h2>
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4 border-l-2 border-secondary pl-6">
                <h3 className="text-xl font-bold">Verified Every Time</h3>
                <p className="text-zinc-400">We physically verify every listing to ensure what you see is what you get. No dummy listings, no misinformation.</p>
              </div>
              <div className="space-y-4 border-l-2 border-secondary pl-6">
                <h3 className="text-xl font-bold">Local Network</h3>
                <p className="text-zinc-400">Our deep roots in the Kenyan market connect you with off-market opportunities and the best deals in the country.</p>
              </div>
              <div className="space-y-4 border-l-2 border-secondary pl-6">
                <h3 className="text-xl font-bold">Direct Channels</h3>
                <p className="text-zinc-400">Integrated WhatsApp and direct agent lines mean you get answers in seconds, not days.</p>
              </div>
              <div className="space-y-4 border-l-2 border-secondary pl-6">
                <h3 className="text-xl font-bold">Licensed Pros</h3>
                <p className="text-zinc-400">We only work with registered agents and reputable developers, ensuring your investment is secure.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </section>

      {/* Featured Properties Section */}
      <section className="bg-background py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-primary">Latest Collections</h2>
              <p className="text-muted-foreground text-lg">Hand-picked properties that define the standard of excellence.</p>
            </div>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-2" asChild>
              <Link href="/properties">Browse All Listings</Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="container py-24 px-4 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center text-white shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070"
              alt="Elite Kenyan Real Estate"
              fill
              className="object-cover opacity-20 pointer-events-none"
            />
          </div>
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-tight">Ready to List Your Property?</h2>
            <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed">
              Join Kenya&apos;s most elite network of real estate professionals and showcase your properties to qualified buyers.
            </p>
            <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-xl" asChild>
              <Link href="/auth/register-agent">Become a Rafiki Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
