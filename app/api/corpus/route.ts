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

    // Log the download attempt
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    await prisma.rAGCorpusDownload.create({
      data: {
        claimId: claim.id,
        ip: ip
      }
    });

    const corpusName = claim.project.corpusObject;
    
    // For external corpora, we might just redirect or serve the guide
    if (corpusName === "External_Corpora_Download_Guide.md") {
      const guidePath = path.join(process.cwd(), 'public', corpusName);
      if (!fs.existsSync(guidePath)) {
        return new NextResponse("Guide not found", { status: 404 });
      }
      const stream = fs.createReadStream(guidePath);
      return new NextResponse(stream as any, {
        headers: {
          'Content-Disposition': `attachment; filename="${corpusName}"`,
          'Content-Type': 'text/markdown',
        },
      });
    }

    // For synthetic corpora
    const zipPath = path.join(process.cwd(), 'private', 'corpora', corpusName);
    
    if (!fs.existsSync(zipPath)) {
      console.error(`Corpus file missing: ${zipPath}`);
      return new NextResponse("Corpus file is missing on the server. Please contact support.", { status: 404 });
    }

    const stat = fs.statSync(zipPath);
    const stream = fs.createReadStream(zipPath);

    return new NextResponse(stream as any, {
      headers: {
        'Content-Disposition': `attachment; filename="${corpusName}"`,
        'Content-Type': 'application/zip',
        'Content-Length': stat.size.toString(),
      },
    });

  } catch (error) {
    console.error("Error serving corpus:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
