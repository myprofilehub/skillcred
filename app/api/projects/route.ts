import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const projects = await prisma.rAGProject.findMany({
      where: {
        isOpen: true,
      },
      include: {
        claims: {
          select: {
            id: true, // Just to check if it exists
          }
        }
      },
      orderBy: {
        projectNo: 'asc',
      }
    });

    const formattedProjects = projects.map(p => ({
      projectNo: p.projectNo,
      title: p.title,
      corpusSummary: p.corpusSummary,
      useCase: p.useCase,
      constraintText: p.constraintText,
      status: p.claims.length > 0 ? 'claimed' : 'available'
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
