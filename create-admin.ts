import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'admin@skillcred.in' },
      update: { password: hashedPassword, role: 'ADMIN' },
      create: { 
        email: 'admin@skillcred.in', 
        name: 'Admin', 
        password: hashedPassword, 
        role: 'ADMIN',
        username: 'admin123' 
      }
    });
    console.log('Success!', user.email, 'Role:', user.role);
  } catch(e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
