
import { db } from "@backend/lib/db"

async function main() {
    const users = await db.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            name: true
        }
    })

    console.log("Found users:", users)
}

main()
