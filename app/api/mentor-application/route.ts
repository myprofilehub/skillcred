import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { uploadToDrive } from "@/lib/drive";
import { sendMentorApplicationAdminNotification, sendMentorApplicationConfirmation } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        // Extract basic info
        const firstName = formData.get("fname")?.toString() || "";
        const lastName = formData.get("lname")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const phone = formData.get("phone")?.toString() || "";
        const linkedinUrl = formData.get("linkedin")?.toString() || "";
        const githubUrl = formData.get("github")?.toString() || "";
        
        // Extract array form data (checkboxes might send multiple fields with same name)
        const domains = formData.getAll("domain").map(v => v.toString());
        
        // Extract other string info
        const experience = formData.get("experience")?.toString() || "";
        const tools = formData.get("tools")?.toString() || "";
        const teachingExperience = formData.get("teaching")?.toString() || "";
        const videosPerMonth = formData.get("videos_per_month")?.toString() || "";
        
        // Ensure email is provided
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Handle file uploads
        const resumeFile = formData.get("resume") as File | null;
        const videoFile = formData.get("sample_video") as File | null;
        
        let resumeUrl = null;
        let videoUrl = null;

        try {
            if (resumeFile && resumeFile.size > 0) {
                const buffer = Buffer.from(await resumeFile.arrayBuffer());
                const uploadRes = await uploadToDrive({
                    filename: resumeFile.name,
                    mimeType: resumeFile.type || "application/pdf",
                    buffer
                });
                resumeUrl = uploadRes.webViewLink || null;
            }
            
            if (videoFile && videoFile.size > 0) {
                const buffer = Buffer.from(await videoFile.arrayBuffer());
                const uploadRes = await uploadToDrive({
                    filename: videoFile.name,
                    mimeType: videoFile.type || "video/mp4",
                    buffer
                });
                videoUrl = uploadRes.webViewLink || null;
            }
        } catch (uploadError: any) {
            console.error("Drive Upload Error:", uploadError);
            return NextResponse.json({ error: "Failed to upload files to Google Drive." }, { status: 500 });
        }

        // Save to DB
        const application = await prisma.mentorApplication.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                linkedinUrl,
                githubUrl,
                domains,
                experience,
                tools,
                teachingExperience,
                videosPerMonth,
                resumeUrl,
                videoUrl
            }
        });

        // Send Email Notifications
        const fullName = `${firstName} ${lastName}`.trim() || email.split("@")[0];
        const domainStr = domains.join(", ") || "Not specified";
        
        // Send Email Notifications asynchronously (fire and forget!) to speed up UI
        Promise.allSettled([
            sendMentorApplicationAdminNotification(
                fullName,
                email,
                domainStr,
                experience,
                resumeUrl,
                videoUrl
            ),
            sendMentorApplicationConfirmation(
                fullName,
                email
            )
        ]).then(results => {
            results.forEach((res, index) => {
                if (res.status === 'rejected') {
                    console.error("Email " + index + " failed:", res.reason);
                }
            });
        });

        return NextResponse.json({ success: true, applicationId: application.id });
    } catch (error: any) {
        console.error("Error submitting mentor application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
