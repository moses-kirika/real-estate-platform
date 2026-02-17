
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Create a second agent
    const agent = await prisma.user.create({
        data: {
            email: 'sarah@elitehomes.ke',
            name: 'Sarah Kimani',
            role: 'AGENT',
            phone: '+254711223344',
            company: 'Elite Homes Kenya',
            licenseNumber: 'EHK-2026-889',
            address: 'Westlands, Nairobi',
            properties: {
                create: [
                    {
                        title: "Modern Apartment in Kileleshwa",
                        description: "Stunning 3-bedroom apartment with panoramic views of the city. Features include a modern kitchen, spacious living area, and access to a rooftop pool and gym.",
                        price: 25000000,
                        location: "Kileleshwa, Nairobi",
                        type: "Apartment",
                        bedrooms: 3,
                        bathrooms: 3,
                        area: 2200,
                        features: "Swimming Pool, Gym, Parking, Security, Balcony, Elevator",
                        status: "AVAILABLE",
                        images: {
                            create: [
                                { url: "/images/properties/luxury-villa.jpg" }
                            ]
                        }
                    },
                    {
                        title: "Cozy Studio in Kilimani",
                        description: "Perfect for young professionals, this fully furnished studio apartment offers convenience and style. Located near major shopping malls and business hubs.",
                        price: 65000,
                        location: "Kilimani, Nairobi",
                        type: "Studio",
                        bedrooms: 1,
                        bathrooms: 1,
                        area: 450,
                        features: "Furnished, WiFi, Security, Parking",
                        status: "AVAILABLE",
                        images: {
                            create: [
                                { url: "/images/properties/modern-apartment.jpg" }
                            ]
                        }
                    }
                ]
            }
        },
    })

    console.log(`Created agent: ${agent.name} (${agent.email}) with 2 properties`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
