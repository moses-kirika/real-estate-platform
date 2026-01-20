"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { propertySchema, PropertySchema } from "@/lib/validations/property"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function PropertyForm({ initialData }: { initialData?: PropertySchema & { id: string } }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<PropertySchema>({
        // @ts-expect-error - Environment specific type mismatch between zod/react-hook-form
        resolver: zodResolver(propertySchema),
        defaultValues: initialData ? {
            title: initialData.title,
            description: initialData.description,
            price: Number(initialData.price),
            location: initialData.location,
            type: initialData.type,
            status: initialData.status,
            bedrooms: initialData.bedrooms ?? 0,
            bathrooms: initialData.bathrooms ?? 0,
            area: initialData.area ?? 0,
            features: initialData.features,
        } : {
            title: "",
            description: "",
            price: 0,
            location: "",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 0,
            bathrooms: 0,
            area: 0,
            features: "",
        },
    }) as any

    async function onSubmit(values: PropertySchema) {
        setIsLoading(true)
        try {
            const response = await fetch(
                initialData ? `/api/properties/${initialData.id}` : "/api/properties",
                {
                    method: initialData ? "PATCH" : "POST",
                    body: JSON.stringify({
                        ...values,
                        // features are already a string in the schema now
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            toast.success(initialData ? "Property updated" : "Property created")
            router.push("/agent/properties")
            router.refresh()
        } catch {
            toast.error("Failed to save property")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Luxurious Beachfront Villa" {...field} />
                            </FormControl>
                            <FormDescription>The main display name for your property.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Process Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="SALE">For Sale</SelectItem>
                                        <SelectItem value="RENT">For Rent</SelectItem>
                                        <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                                        <SelectItem value="LAND">Land</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Dubai Marina, UAE" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell potential buyers about your property..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area (Sq Ft)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Features (Comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="Pool, Gym, Parking, WiFi" {...field} />
                            </FormControl>
                            <FormDescription>Add highlights of the property.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? "Saving..." : initialData ? "Update Property" : "Publish Property"}
                </Button>
            </form>
        </Form>
    )
}
