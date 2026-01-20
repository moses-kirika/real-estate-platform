"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function completePropertyDeal(formData: FormData) {
    const session = await auth()
    if (!session || !session.user || (session.user.role !== "AGENT" && session.user.role !== "ADMIN")) {
        throw new Error("Unauthorized")
    }

    const propertyId = formData.get("propertyId") as string
    const amount = parseFloat(formData.get("amount") as string)
    const type = formData.get("type") as string // SALE or RENT

    if (!propertyId || isNaN(amount)) {
        throw new Error("Invalid deal information")
    }

    // Verify property ownership
    const property = await db.property.findUnique({
        where: { id: propertyId }
    })

    if (!property || property.ownerId !== session.user.id) {
        throw new Error("Property not found or access denied")
    }

    // Start transaction
    await db.$transaction([
        db.transactionLog.create({
            data: {
                propertyId,
                agentId: session.user.id,
                amount,
                type,
            }
        }),
        db.property.update({
            where: { id: propertyId },
            data: { status: type === "SALE" ? "SOLD" : "RENTED" }
        })
    ])

    revalidatePath("/agent/properties")
    revalidatePath("/agent")
    revalidatePath("/agent/analytics")
}

export async function getAgentAnalytics() {
    const session = await auth()
    if (!session || !session.user || (session.user.role !== "AGENT" && session.user.role !== "ADMIN")) {
        throw new Error("Unauthorized")
    }

    const agentId = session.user.id

    // Fetch data for analytics
    const [transactions, inquiryCount, propertyCount] = await Promise.all([
        db.transactionLog.findMany({
            where: { agentId },
            orderBy: { createdAt: "desc" }
        }),
        db.inquiry.count({
            where: {
                property: { ownerId: agentId }
            }
        }),
        db.property.count({
            where: { ownerId: agentId }
        })
    ])

    const totalRevenue = transactions.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0)

    // Group inquiries by month for a chart (simplified)
    const recentInquiries = await db.inquiry.findMany({
        where: {
            property: { ownerId: agentId }
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
            property: {
                select: { title: true }
            }
        }
    })

    // Calculate revenue trends (last 6 months)
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const monthlyData = []
    for (let i = 0; i < 6; i++) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - 5 + i + 1, 0)

        const monthRevenue = transactions
            .filter((t: any) => t.createdAt >= monthStart && t.createdAt <= monthEnd)
            .reduce((acc: number, curr: any) => acc + Number(curr.amount), 0)

        monthlyData.push({
            month: monthStart.toLocaleString('default', { month: 'short' }),
            revenue: monthRevenue
        })
    }

    return {
        totalRevenue,
        transactionCount: transactions.length,
        inquiryCount,
        propertyCount,
        recentInquiries: JSON.parse(JSON.stringify(recentInquiries)), // Ensure plain objects
        monthlyData,
        recentTransactions: transactions.slice(0, 5).map((tx: any) => ({
            ...tx,
            amount: Number(tx.amount),
            createdAt: tx.createdAt.toISOString()
        }))
    }
}
