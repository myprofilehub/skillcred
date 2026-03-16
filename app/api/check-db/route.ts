import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const mentors = await prisma.user.findMany({
            where: { role: 'MENTOR' },
            select: { name: true, email: true }
        });
        return NextResponse.json({ mentors });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
