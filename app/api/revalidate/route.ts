import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    // Revalidate all common stream paths
    revalidatePath("/streams/full-stack-development");
    revalidatePath("/streams/ai-ml");
    revalidatePath("/streams/cybersecurity");
    revalidatePath("/streams/data-engineering");
    revalidatePath("/streams/devops-cloud");
    revalidatePath("/streams/mobile-development");
    revalidatePath("/streams/iot-embedded");
    revalidatePath("/streams/data-science");
    revalidatePath("/", "layout"); // Clears everything generally
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
}
