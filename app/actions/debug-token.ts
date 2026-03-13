"use server";

import { auth } from "@/auth";

export async function checkTokenScopes() {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "No access token found" };
    }

    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${session.accessToken}`);
        const data = await response.json();
        return data;
    } catch (e) {
        return { error: "Failed to check token" };
    }
}
