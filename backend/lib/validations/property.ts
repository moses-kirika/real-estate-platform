import { z } from "zod"

export const propertySchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    price: z.coerce.number().positive(),
    location: z.string().min(2),
    type: z.string().min(1),
    status: z.string().default("AVAILABLE"),
    bedrooms: z.coerce.number().int().nonnegative(),
    bathrooms: z.coerce.number().int().nonnegative(),
    area: z.coerce.number().positive(),
    features: z.string().default(""),
})

export type PropertySchema = z.infer<typeof propertySchema>
