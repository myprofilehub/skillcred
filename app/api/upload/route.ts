import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const token = formData.get("token") as string;
    const type = formData.get("type") as string; // e.g., 'tamil', 'english', 'obj1'

    if (!file || !token || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/counselor/
    const uploadDir = join(process.cwd(), "public", "uploads", "counselor");
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // e.g. token-tamil.webm
    const ext = file.name.split('.').pop() || 'webm';
    const filename = `${token}-${type}.${ext}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/counselor/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
