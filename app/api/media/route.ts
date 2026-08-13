import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  const cleanPath = url.startsWith("/") ? url.substring(1) : url;
  
  if (cleanPath.includes("..")) {
      return new NextResponse("Forbidden", { status: 403 });
  }
  
  const resolvedPath = join(process.cwd(), "public", cleanPath);

  if (!existsSync(resolvedPath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readFile(resolvedPath);
    let mime = 'video/webm';
    if (url.includes('audio')) mime = 'audio/webm';
    if (resolvedPath.endsWith('.mp4')) mime = 'video/mp4';
    
    return new NextResponse(file, {
      headers: {
        "Content-Type": mime,
      },
    });
  } catch (e) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
