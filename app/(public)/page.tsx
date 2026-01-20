import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { PropertyCard } from "@/components/property-card";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/properties/mombasa_beachfront_apartment.png"
            alt="Premium Kenyan Real Estate"
            fill
            priority
            className="object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-4xl space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-2xl leading-tight">
                Discover Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Perfect Sanctuary</span>
              </h1>
              <p className="max-w-[700px] text-zinc-200 md:text-2xl text-lg font-medium drop-shadow-md">
                Experience the pinnacle of Kenyan real estate. From serene coastal villas to sophisticated urban lofts.
              </p>
            </div>

            {/* High-Contrast Search Bar */}
            <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-2xl w-full animate-slide-up [animation-delay:200ms] border border-white/20">
              <form action="/properties" className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4">
                  <svg className="h-5 w-5 text-zinc-400 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="search"
                    placeholder="Neighborhood, city or building..."
                    className="flex-1 px-4 h-14 text-zinc-900 placeholder:text-zinc-500 focus:outline-none bg-transparent text-lg"
                  />
                </div>
                <Button size="lg" className="h-14 px-10 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Find Property
                </Button>
              </form>
            </div>

            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:400ms]">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-sm font-medium shadow-sm">40+ Exclusive Listings</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-white text-sm font-medium shadow-sm">Top Rated Agents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y bg-zinc-50/50">
        <div className="container px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Trusted by property seekers across East Africa</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale contrast-125">
            <span className="text-2xl font-black italic tracking-tighter">ESTATE CO.</span>
            <span className="text-2xl font-black italic tracking-tighter">URBAN NESTS</span>
            <span className="text-2xl font-black italic tracking-tighter">COASTAL LIVING</span>
            <span className="text-2xl font-black italic tracking-tighter">LUXURY KENYA</span>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-zinc-50/50 py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Collections</h2>
              <p className="text-muted-foreground text-lg">Hand-picked properties that define the standard of excellence.</p>
            </div>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-2 bg-white" asChild>
              <Link href="/properties">Explore All Properties</Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          {featuredProperties.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-zinc-200">
              <p className="text-muted-foreground text-lg italic">Our curated properties are arriving soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 px-4">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-20 text-center text-white shadow-2xl">
          <Image
            src="/images/properties/nairobi_luxury_villa.png"
            alt="Agent background"
            fill
            className="object-cover opacity-20 pointer-events-none"
          />
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ready to List Your Property?</h2>
            <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed">
              Join Kenya&apos;s most elite network of real estate agents and showcase your properties to thousands of qualified buyers.
            </p>
            <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-white text-black hover:bg-zinc-200 font-bold" asChild>
              <Link href="/auth/register">Become an Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
