import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    // 1. Ensure we have an agent user to own these properties
    const agent = await prisma.user.upsert({
        where: { email: "agent@example.com" },
        update: {
            password: await bcrypt.hash("password123", 10),
        },
        create: {
            name: "Kenyan Elite Properties",
            email: "agent@example.com",
            role: "AGENT",
            password: await bcrypt.hash("password123", 10),
        },
    })

    console.log(`Using agent: ${agent.name} (${agent.id})`)

    const kenyanProperties = [
        {
            title: "Luxurious 4-Bedroom Villa - Westlands",
            description: "An architectural masterpiece in the heart of Westlands, Nairobi. This stunning villa features 4 ensuite bedrooms, a private swimming pool, landscaped gardens, and a state-of-the-art kitchen. Perfect for high-end urban living with maximum security and privacy.",
            price: 85000000, // 85M KES
            location: "Westlands, Nairobi",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 4,
            bathrooms: 4,
            area: 4500,
            features: "Swimming Pool, Garden, Solar Water Heating, CCTV, High-Speed Internet, Staff Quarters",
            imageUrl: "/images/properties/nairobi_luxury_villa.png"
        },
        {
            title: "Nyali Beachfront Apartment - 3 Bedroom",
            description: "Experience coastal luxury at its finest. This 3-bedroom apartment in Nyali, Mombasa, offers breathtaking views of the Indian Ocean. Enjoy sea breezes from your private balcony, access to a shared infinity pool, and direct beach access. Fully air-conditioned with premium finishes.",
            price: 35000000, // 35M KES
            location: "Nyali, Mombasa",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 3,
            bathrooms: 3,
            area: 2800,
            features: "Ocean View, Beach Access, Swimming Pool, Gym, Backup Generator, Lift",
            imageUrl: "/images/properties/mombasa_beachfront_apartment.png"
        },
        {
            title: "Classic Karen Mansion",
            description: "Nestled in the serene suburbs of Karen, this 5-bedroom mansion sits on a lush 1-acre plot. It features a classic design with modern amenities, multiple fireplaces, a separate guest wing, and mature trees providing a tranquit environment. Ideal for a family seeking peace and space.",
            price: 120000000, // 120M KES
            location: "Karen, Nairobi",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 5,
            bathrooms: 5,
            area: 6000,
            features: "Acreage, Guest Wing, Fireplace, Borehole, Electric Fence, Carport",
            imageUrl: "/images/properties/nairobi_karen_mansion.png"
        },
        {
            title: "Modern 3-Bedroom House - Milimani",
            description: "Contemporary living in Kisumu's premier residential area. This modern 3-bedroom house in Milimani offers spacious living areas, high-quality finishes, and a stunning view of Lake Victoria from the upper floor. Features a manicured garden and secure perimeter wall.",
            price: 22000000, // 22M KES
            location: "Milimani, Kisumu",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 3,
            bathrooms: 3,
            area: 2200,
            features: "Lake View, Modern Finishes, Alarm System, Parking, Perimeter Wall",
            imageUrl: "/images/properties/kisumu_modern_house_milimani.png"
        },
        {
            title: "Kilimani Lofts - Stylish 2 Bedroom",
            description: "Perfect for young professionals or investors. These stylish 2-bedroom apartments in Kilimani, Nairobi, offer a blend of comfort and convenience. Walking distance to major shopping malls and business districts. Includes roof-top terrace and secure parking.",
            price: 14500000, // 14.5M KES
            location: "Kilimani, Nairobi",
            type: "SALE",
            status: "AVAILABLE",
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            features: "Rooftop Terrace, Elevator, Gym, 24/7 Security, Near Mall",
            imageUrl: "/images/properties/nairobi_kilimani_apartment_modern.png"
        }
    ]

    for (const prop of kenyanProperties) {
        const { imageUrl, ...propDetails } = prop
        const property = await prisma.property.create({
            data: {
                ...propDetails,
                ownerId: agent.id,
                images: {
                    create: [
                        { url: imageUrl }
                    ]
                }
            }
        })
        console.log(`Created property: ${property.title}`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
