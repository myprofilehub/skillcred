import 'dotenv/config';
import { prisma } from "../lib/db";

async function main() {
    const oldEmail = "gmsai35@gmail.com";
    const newEmail = "mentor1@codequestzone.com";

    try {
        console.log(`Updating email for user: ${oldEmail} -> ${newEmail}`);

        const user = await prisma.user.findUnique({
            where: { email: oldEmail },
        });

        if (!user) {
            console.error(`User with email ${oldEmail} not found.`);
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { email: newEmail },
        });

        console.log("Successfully updated user email:");
        console.log(`- ID: ${updatedUser.id}`);
        console.log(`- New Email: ${updatedUser.email}`);

    } catch (e) {
        console.error("Error updating user:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
