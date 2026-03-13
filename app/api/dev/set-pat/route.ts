import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Utility route to set PAT passed for a student (for testing only)
// DELETE this in production!
export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: { studentProfile: { include: { portfolio: true } } }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.studentProfile) {
            return NextResponse.json({ error: "No student profile" }, { status: 404 });
        }

        let portfolio;
        if (!user.studentProfile.portfolio) {
            // Create portfolio with PAT passed
            portfolio = await prisma.portfolio.create({
                data: {
                    studentId: user.studentProfile.id,
                    patPassedAt: new Date(),
                    isUnlocked: true
                }
            });
        } else {
            // Update existing portfolio
            portfolio = await prisma.portfolio.update({
                where: { id: user.studentProfile.portfolio.id },
                data: {
                    patPassedAt: new Date(),
                    isUnlocked: true
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: `PAT marked as passed for ${email}`,
            portfolio
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
