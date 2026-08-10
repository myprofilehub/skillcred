"use server";

import { prisma } from "@/lib/db";

export async function saveAdminNotes(assessmentId: string, notes: string) {
  try {
    await prisma.counselorAssessment.update({
      where: { id: assessmentId },
      data: { adminNotes: notes },
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save admin notes:", error);
    return { error: "Failed to save notes" };
  }
}
