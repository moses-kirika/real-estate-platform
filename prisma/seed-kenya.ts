import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("Starting database expansion...")

    const agentsData = [
        {
            email: "agent@example.com",
            name: "Kenyan Elite Properties",
            company: "Elite Real Estate Kenya",
            phone: "+254 700 000 000",
            licenseNumber: "REA-2024-00123",
            address: "Westlands Commercial Center, Nairobi",
            bio: "With over 15 years of experience in the Kenyan luxury real estate market, Kenyan Elite Properties specializes in high-end residential and commercial properties in Nairobi's most prestigious neighborhoods.",
            badgeLevel: "GOLD",
            properties: [
                {
                    title: "Luxurious 4-Bedroom Villa - Westlands",
                    description: "An architectural masterpiece in the heart of Westlands, Nairobi. Features 4 ensuite bedrooms, a private swimming pool, and landscaped gardens.",
                    price: 85000000,
                    location: "Westlands, Nairobi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 4,
                    bathrooms: 4,
                    area: 4500,
                    features: "Swimming Pool, Garden, Solar Water Heating, CCTV, High-Speed Internet",
                    lat: -1.2635,
                    lng: 36.8024,
                    images: [
                        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Karen Classic Mansion",
                    description: "Nestled on a 1-acre plot in Karen, this 5-bedroom mansion offers classic design with modern amenities and a separate guest wing.",
                    price: 120000000,
                    location: "Karen, Nairobi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 5,
                    bathrooms: 5,
                    area: 6000,
                    features: "Acreage, Guest Wing, Fireplace, Borehole, Electric Fence",
                    lat: -1.3333,
                    lng: 36.7000,
                    images: [
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Lavington Executive Townhouse",
                    description: "A modern 4-bedroom townhouse in a gated community in Lavington. High-quality finishes and maximum security.",
                    price: 45000000,
                    location: "Lavington, Nairobi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 4,
                    bathrooms: 4,
                    area: 3200,
                    features: "Gated Community, Rooftop Terrace, Backup Generator, DSQ",
                    lat: -1.2833,
                    lng: 36.7667,
                    images: [
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Runda Evergreen Estate Villa",
                    description: "Magnificent 5-bedroom villa in Runda Evergreen. Features a sprawling garden and high ceilings.",
                    price: 95000000,
                    location: "Runda, Nairobi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 5,
                    bathrooms: 5,
                    area: 5500,
                    features: "Large Garden, Modern Kitchen, Secure Neighborhood, Solar Lighting",
                    lat: -1.2167,
                    lng: 36.8167,
                    images: [
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Muthaiga Heights Penthouse",
                    description: "Ultra-modern 3-bedroom penthouse with panoramic views of Muthaiga and Karura Forest.",
                    price: 65000000,
                    location: "Muthaiga, Nairobi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 3,
                    bathrooms: 4,
                    area: 3800,
                    features: "Panic Room, Forest View, Private Lift, Smart Home System",
                    lat: -1.2500,
                    lng: 36.8333,
                    images: [
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512918766775-9411917fd82b?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop"
                    ]
                }
            ]
        },
        {
            email: "coast@example.com",
            name: "Hassan Ali",
            company: "Coast Properties Ltd",
            phone: "+254 711 222 333",
            licenseNumber: "REA-2024-00456",
            address: "Nyali Plaza, Mombasa",
            bio: "Hassan Ali is a specialist in coastal real estate with a deep understanding of the unique market dynamics in Mombasa and Diani.",
            badgeLevel: "SILVER",
            properties: [
                {
                    title: "Nyali Waterfront Apartment",
                    description: "Breathtaking views of the Indian Ocean from this 3-bedroom apartment. Direct beach access and pool.",
                    price: 35000000,
                    location: "Nyali, Mombasa",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 3,
                    bathrooms: 3,
                    area: 2800,
                    features: "Ocean View, Beach Access, Swimming Pool, Gym, Lift",
                    lat: -4.0333,
                    lng: 39.6833,
                    images: [
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Diani Beach Luxury Villa",
                    description: "A private oasis tucked away in Diani. 4 ensuite bedrooms with a tropical garden and private pool.",
                    price: 55000000,
                    location: "Diani, Kwale",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 4,
                    bathrooms: 4,
                    area: 4000,
                    features: "Private Pool, Tropical Garden, Fully Furnished, Walk to Beach",
                    lat: -4.2833,
                    lng: 39.5833,
                    images: [
                        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1599809275671-b5941cabc7a5?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Shanzu Serenity Heights",
                    description: "Modern 2-bedroom apartments in Shanzu, perfect for holiday homes or investments.",
                    price: 12000000,
                    location: "Shanzu, Mombasa",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 2,
                    bathrooms: 2,
                    area: 1500,
                    features: "Sea Breezes, Modern Finishes, Boundary Wall, Secure Parking",
                    lat: -3.9667,
                    lng: 39.7500,
                    images: [
                        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Tudor Creek Modern Mansion",
                    description: "Elegant 6-bedroom mansion overlooking Tudor Creek. Includes a boat dock and large entertaining space.",
                    price: 75000000,
                    location: "Tudor, Mombasa",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 6,
                    bathrooms: 6,
                    area: 5000,
                    features: "Creek View, Boat Dock, Large Veranda, Staff Quarters",
                    lat: -4.0500,
                    lng: 39.6667,
                    images: [
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Mtwapa Waterside Haven",
                    description: "Relaxing 3-bedroom home near Mtwapa Creek. Ideal for those seeking peace and quiet away from the city.",
                    price: 18000000,
                    location: "Mtwapa, Kilifi",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 3,
                    bathrooms: 3,
                    area: 2200,
                    features: "Creek Proximity, Garden, Perimeter Wall, Quiet Area",
                    lat: -3.9500,
                    lng: 39.7500,
                    images: [
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop"
                    ]
                }
            ]
        },
        {
            email: "rift@example.com",
            name: "Sarah Wanjiku",
            company: "Rift Valley Realty",
            phone: "+254 722 555 666",
            licenseNumber: "REA-2024-00789",
            address: "Mega City, Kisumu",
            bio: "Sarah Wanjiku is the leading expert in Western Kenya's real estate market, covering Kisumu, Eldoret, and everything in between.",
            badgeLevel: "SILVER",
            properties: [
                {
                    title: "Milimani Modern House",
                    description: "3-bedroom house in Kisumu's Milimani with a view of Lake Victoria. Manicured garden and secure perimeter wall.",
                    price: 22000000,
                    location: "Milimani, Kisumu",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 3,
                    bathrooms: 3,
                    area: 2200,
                    features: "Lake View, Modern Finishes, Alarm System, Perimeter Wall",
                    lat: -0.1022,
                    lng: 34.7617,
                    images: [
                        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Elgon View Mansionette",
                    description: "Spacious 4-bedroom mansionette in Eldoret's premier Elgon View neighborhood.",
                    price: 28000000,
                    location: "Elgon View, Eldoret",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 4,
                    bathrooms: 3,
                    area: 3000,
                    features: "Green Surroundings, Secure Gated Area, Parking for 4 Cars",
                    lat: 0.5167,
                    lng: 35.2833,
                    images: [
                        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Riat Hills Luxury Home",
                    description: "High-end 5-bedroom home in Riat Hills, Kisumu. Panoramic views of the city and the lake.",
                    price: 45000000,
                    location: "Riat Hills, Kisumu",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 5,
                    bathrooms: 5,
                    area: 4500,
                    features: "City Lights View, Lake Victoria View, Modern Open Kitchen, Electric Fencing",
                    lat: -0.0667,
                    lng: 34.7833,
                    images: [
                        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512918766775-9411917fd82b?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Kenyatta Avenue Serviced Apartments",
                    description: "1 and 2 bedroom serviced apartments in the heart of Nakuru city center.",
                    price: 8500000,
                    location: "CBD, Nakuru",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 1,
                    bathrooms: 1,
                    area: 800,
                    features: "Hotel Amenities, High Rental Yield, 24/7 Security, City Views",
                    lat: -0.2833,
                    lng: 36.0667,
                    images: [
                        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop"
                    ]
                },
                {
                    title: "Naivasha Lakeside Retreat",
                    description: "Comfortable 3-bedroom cottage overlooking Lake Naivasha. Perfect for weekend getaways.",
                    price: 15000000,
                    location: "South Lake, Naivasha",
                    type: "SALE",
                    status: "AVAILABLE",
                    bedrooms: 3,
                    bathrooms: 2,
                    area: 1800,
                    features: "Lake Proximity, Large Garden, Wildlife Frequent Visits, Solar Hot Water",
                    lat: -0.7167,
                    lng: 36.4333,
                    images: [
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
                    ]
                }
            ]
        }
    ]

    for (const agentData of agentsData) {
        const { properties, email, ...userData } = agentData

        // 1. Upsert the agent
        const agent = await prisma.user.upsert({
            where: { email },
            update: {
                ...userData,
                password: await bcrypt.hash("password123", 10),
            },
            create: {
                email,
                ...userData,
                role: "AGENT",
                password: await bcrypt.hash("password123", 10),
            },
        })

        console.log(`Updated agent: ${agent.name} (${agent.id})`)

        // 2. Clear existing properties for this agent
        const existingProperties = await prisma.property.findMany({
            where: { ownerId: agent.id },
            select: { id: true }
        })

        const propertyIds = existingProperties.map(p => p.id)

        if (propertyIds.length > 0) {
            await prisma.savedListing.deleteMany({ where: { propertyId: { in: propertyIds } } })
            await prisma.inquiry.deleteMany({ where: { propertyId: { in: propertyIds } } })
            await prisma.transactionLog.deleteMany({ where: { propertyId: { in: propertyIds } } })
            await prisma.propertyImage.deleteMany({ where: { propertyId: { in: propertyIds } } })
            await prisma.property.deleteMany({ where: { ownerId: agent.id } })
            console.log(`Cleared existing properties for agent ${agent.name}`)
        }

        // 3. Create new properties
        for (const prop of properties) {
            const { images, ...propDetails } = prop
            await prisma.property.create({
                data: {
                    ...propDetails,
                    ownerId: agent.id,
                    images: {
                        create: images.map(url => ({ url }))
                    }
                }
            })
            console.log(`  - Created property: ${prop.title}`)
        }
    }

    console.log("Database expansion completed successfully!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
