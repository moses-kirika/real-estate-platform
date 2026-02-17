"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"

interface SavePropertyButtonProps {
    propertyId: string
    initialSaved?: boolean
    isAuthenticated: boolean
}

export function SavePropertyButton({
    propertyId,
    initialSaved = false,
    isAuthenticated
}: SavePropertyButtonProps) {
    const [isSaved, setIsSaved] = useState(initialSaved)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleToggleSave = async () => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            toast.error("Please log in to save properties")
            router.push("/auth/login")
            return
        }

        setIsLoading(true)

        try {
            if (isSaved) {
                // Unsave - we need to find the saved listing ID first
                const res = await fetch("/api/saved-properties")
                const savedListings = await res.json()

                const savedListing = savedListings.find(
                    (listing: any) => listing.propertyId === propertyId
                )

                if (savedListing) {
                    await fetch(`/api/saved-properties/${savedListing.id}`, {
                        method: "DELETE"
                    })
                }

                setIsSaved(false)
                toast.success("Property removed from saved list")
            } else {
                // Save
                await fetch("/api/saved-properties", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ propertyId })
                })

                setIsSaved(true)
                toast.success("Property saved successfully!")
            }

            router.refresh()
        } catch (error) {
            console.error("Error toggling save:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant={isSaved ? "default" : "outline"}
            className="w-full"
            onClick={handleToggleSave}
            disabled={isLoading}
        >
            <Heart
                className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
            />
            {isLoading ? "..." : isSaved ? "Saved" : "Save Property"}
        </Button>
    )
}
