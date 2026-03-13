
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
    const user = await prisma.user.findUnique({
        where: { email: 'mgmags25@gmail.com' },
        include: { student: true } // Assuming student relation exists
    });
    console.log(JSON.stringify(user, null, 2));
}

checkUser()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
