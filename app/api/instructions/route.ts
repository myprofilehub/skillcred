import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('t');

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const claim = await prisma.rAGClaim.findUnique({
      where: { submissionToken: token },
      include: { project: true }
    });

    if (!claim) {
      return new NextResponse("Invalid or expired token", { status: 401 });
    }

    const pdfName = `${claim.project.projectNo.toString().padStart(2, '0')}_instructions.pdf`;
    const pdfPath = path.join(process.cwd(), 'private', 'instructions', pdfName);
    
    if (!fs.existsSync(pdfPath)) {
      console.error(`Instructions file missing: ${pdfPath}`);
      return new NextResponse("Instructions file is missing on the server. Please contact support.", { status: 404 });
    }

    const stat = fs.statSync(pdfPath);
    const stream = fs.createReadStream(pdfPath);

    return new NextResponse(stream as any, {
      headers: {
        'Content-Disposition': `attachment; filename="${pdfName}"`,
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size.toString(),
      },
    });

  } catch (error) {
    console.error("Error serving instructions:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
