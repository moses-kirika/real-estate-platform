
import { db } from "@/lib/db"

async function main() {
    const email = process.argv[2]

    if (!email) {
        console.error("Please provide an email address")
        process.exit(1)
    }

    const user = await db.user.update({
        where: { email },
        data: { role: "ADMIN" }
    })

    console.log(`Successfully promoted ${user.name} (${user.email}) to ADMIN`)
}

main()
