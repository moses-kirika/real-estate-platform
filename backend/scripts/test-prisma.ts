import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function test() {
    try {
        console.log("Checking models...")
        console.log("User count:", await prisma.user.count())
        console.log("Property count:", await prisma.property.count())
        // @ts-ignore
        console.log("TransactionLog model exists:", !!prisma.transactionLog)
        if (prisma.transactionLog) {
            // @ts-ignore
            console.log("TransactionLog count:", await prisma.transactionLog.count())
        }
    } catch (error) {
        console.error("Test failed:", error)
    } finally {
        await prisma.$disconnect()
    }
}

test()
