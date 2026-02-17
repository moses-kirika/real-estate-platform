"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Filter } from "lucide-react"
import { cn } from "@frontend/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const LOCATIONS = [
    "Nairobi",
    "Westlands",
    "Karen",
    "Kilimani",
    "Lavington",
    "Mombasa",
    "Nyali",
    "Kisumu",
    "Milimani",
    "Nakuru"
]

const PROPERTY_TYPES = [
    { value: "SALE", label: "For Sale" },
    { value: "RENT", label: "For Rent" },
]

export function FilterSidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 shrink-0 space-y-8">
                <FiltersContent />
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </span>
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                Refine Search
                            </Badge>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                        <div className="p-6 h-full overflow-y-auto">
                            <SheetHeader className="mb-6 text-left">
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>
                                    Refine your property search.
                                </SheetDescription>
                            </SheetHeader>
                            <FiltersContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

function FiltersContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State for filters
    const [priceRange, setPriceRange] = useState([0, 200000000])
    const [location, setLocation] = useState("")
    const [locationOpen, setLocationOpen] = useState(false)
    const [type, setType] = useState<string | null>(null)
    const [bedrooms, setBedrooms] = useState<number | null>(null)

    // Initialize state from URL params
    useEffect(() => {
        const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0
        const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 200000000
        setPriceRange([minPrice, maxPrice])

        const loc = searchParams.get("query") || ""
        setLocation(loc)

        const t = searchParams.get("type")
        setType(t)

        const beds = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : null
        setBedrooms(beds)
    }, [searchParams])

    const applyFilters = () => {
        const params = new URLSearchParams()
        if (location) params.set("query", location)
        if (type) params.set("type", type)
        if (bedrooms) params.set("bedrooms", bedrooms.toString())

        // Only set price if changed from default wide range
        if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
        if (priceRange[1] < 200000000) params.set("maxPrice", priceRange[1].toString())

        router.push(`/properties?${params.toString()}`)
    }

    const clearFilters = () => {
        setPriceRange([0, 200000000])
        setLocation("")
        setType(null)
        setBedrooms(null)
        router.push("/properties")
    }

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl">Location</h3>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={locationOpen}
                            className="w-full justify-between"
                        >
                            {location || "Select location..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                        <Command>
                            <CommandInput placeholder="Search location..." />
                            <CommandList>
                                <CommandEmpty>No location found.</CommandEmpty>
                                <CommandGroup>
                                    {LOCATIONS.map((loc) => (
                                        <CommandItem
                                            key={loc}
                                            value={loc}
                                            onSelect={(currentValue: string) => {
                                                setLocation(currentValue === location ? "" : currentValue)
                                                setLocationOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    location.toLowerCase() === loc.toLowerCase() ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {loc}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl">Type</h3>
                <div className="flex gap-2">
                    {PROPERTY_TYPES.map((t) => (
                        <Button
                            key={t.value}
                            variant={type === t.value ? "default" : "outline"}
                            onClick={() => setType(type === t.value ? null : t.value)}
                            className="flex-1"
                        >
                            {t.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl">Price Range</h3>
                    <span className="text-xs text-muted-foreground">KES</span>
                </div>
                <Slider
                    defaultValue={[0, 200000000]}
                    max={200000000}
                    step={1000000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                />
                <div className="flex items-center gap-2">
                    <div className="grid gap-1.5 flex-1">
                        <Label className="text-xs text-muted-foreground">Min</Label>
                        <Input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="h-8 text-xs"
                        />
                    </div>
                    <div className="grid gap-1.5 flex-1">
                        <Label className="text-xs text-muted-foreground">Max</Label>
                        <Input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="h-8 text-xs"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <Button
                            key={num}
                            variant={bedrooms === num ? "default" : "outline"}
                            onClick={() => setBedrooms(bedrooms === num ? null : num)}
                            className="h-10 w-10 p-0 rounded-full"
                        >
                            {num}{num === 5 ? "+" : ""}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="pt-4 space-y-3">
                <Button onClick={applyFilters} className="w-full font-bold">
                    Apply Filters
                </Button>
                {(location || type || bedrooms || priceRange[0] > 0 || priceRange[1] < 200000000) && (
                    <Button
                        onClick={clearFilters}
                        variant="ghost"
                        className="w-full text-muted-foreground hover:text-destructive"
                    >
                        Clear All
                    </Button>
                )}
            </div>
        </div>
    )
}
