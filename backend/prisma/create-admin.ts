import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const adminEmail = "admin@example.com"
    const password = await bcrypt.hash("password123", 10)

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: "System Admin",
            email: adminEmail,
            role: "ADMIN",
            password: password,
        },
    })

    console.log(`Admin user created/verified: ${admin.email}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
