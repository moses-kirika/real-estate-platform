const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const count = await prisma.property.count();
        console.log('PROPERTY_COUNT:' + count);
        const availableCount = await prisma.property.count({ where: { status: 'AVAILABLE' } });
        console.log('AVAILABLE_PROPERTY_COUNT:' + availableCount);

        if (count > 0) {
            const first = await prisma.property.findFirst();
            console.log('FIRST_PROPERTY_STATUS:' + first.status);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
