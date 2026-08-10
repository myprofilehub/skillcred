import { prisma } from '../lib/db';
import crypto from 'crypto';

async function main() {
  const token = crypto.randomBytes(16).toString('hex');
  
  // Set expiration for 7 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const assessment = await prisma.counselorAssessment.create({
    data: {
      token,
      expiresAt,
    }
  });

  console.log('✅ Assessment token generated successfully!');
  console.log('--------------------------------------------------');
  console.log(`Token: ${assessment.token}`);
  console.log(`URL:   http://localhost:3000/apply/counselor?t=${assessment.token}`);
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
