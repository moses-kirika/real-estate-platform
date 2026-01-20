import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const email = "agent@test.com"
    const password = "password123"
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: "AGENT",
            verifiedAt: new Date(),
        },
        create: {
            email,
            name: "Test Agent",
            password: hashedPassword,
            role: "AGENT",
            verifiedAt: new Date(),
            phone: "+254 712 345678",
            company: "Test Realty",
            licenseNumber: "TR-999",
            address: " Nairobi, Kenya",
        },
    })

    console.log(`Test Agent created/updated: ${user.email}`)
    console.log(`Password: ${password}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
