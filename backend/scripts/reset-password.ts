
import { db } from "@backend/lib/db"
import bcrypt from "bcryptjs"

async function main() {
    const email = process.argv[2]
    const newPassword = "password123"

    if (!email) {
        console.error("Please provide an email address")
        process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const user = await db.user.update({
        where: { email },
        data: { password: hashedPassword }
    })

    console.log(`Successfully reset password for ${user.email} to '${newPassword}'`)
}

main()
