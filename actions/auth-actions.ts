"use server";

import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

// ============================================================================
// FREE USER LOGIN
// ============================================================================
export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackUrl = formData.get("callbackUrl") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        
        const user = await prisma.user.findUnique({
            where: { email },
            include: { studentProfile: true }
        });

        let path = callbackUrl || "/";
        if (user?.role === "STUDENT" && user?.studentProfile?.subscription === "FREE" && !callbackUrl) {
            path = "/library";
        }
        
        revalidatePath("/", "layout"); // Force RootLayout to re-render
        return { success: true, redirectTo: path };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}

// ============================================================================
// LMS ENTERPRISE LOGIN
// ============================================================================
export async function lmsLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string; // student, mentor, hr
    const callbackUrl = formData.get("callbackUrl") as string;

    // 1. Verify Domain (Must be skillcred.com)
    const domain = email.split("@")[1];
    if (domain !== "skillcred.com") {
        return { error: "LMS Login is restricted to @skillcred.com email addresses." };
    }

    // 2. Determine Redirect Path based on Role (or callbackUrl if provided)
    let redirectTo = "/dashboard"; // Fallback
    if (callbackUrl) {
        redirectTo = callbackUrl;
    } else if (role === "student") redirectTo = "/dashboard/student";
    else if (role === "mentor") redirectTo = "/dashboard/mentor";
    else if (role === "hr") redirectTo = "/dashboard/hr";
    else if (role === "admin") redirectTo = "/dashboard/admin";

    // 3. Attempt Login
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { lmsEmail: email }
                ]
            }
        });
        if (!user) return { error: "Invalid credentials." };

        // Verify Pass (Pre-check to give better error message about Role)
        if (user.password) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) return { error: "Invalid credentials." };
        } else {
            return { error: "Please use Google Login or set a password." };
        }

        // Verify Role
        if (user.role !== role.toUpperCase()) {
            return { error: `This account is not authorized as a ${role}.` };
        }

        // Proceed to Sign In
        await signIn("credentials", {
            email,
            password,
            redirectTo,
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}

// ============================================================================
// FREE USER REGISTRATION
// ============================================================================
export async function register(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string; // NEW: Username
    const mobile = formData.get("mobile") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !username || !password) { // NEW: Validate username
        return { error: "Name, Email, Username, and Password are required." };
    }

    try {
        // 1. Check if user already exists (email or username or mobile)
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }, // NEW: Check username
                    mobile ? { mobile } : {}
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) return { error: "Email already registered." };
            if (existingUser.username === username) return { error: "Username already taken." }; // NEW
            if (existingUser.mobile === mobile) return { error: "Mobile number already registered." };
            return { error: "User already exists." };
        }

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create User & Student Profile (Transaction not needed as user creation failure rolls back itself usually, but for strictness we could transaction. Keeping simple for now as per previous code style)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                username, // NEW
                mobile: mobile || null,
                password: hashedPassword,
                role: "STUDENT", // Default for public signup
            }
        });

        // 4. Create Student Profile (Subscription: FREE)
        await prisma.student.create({
            data: {
                userId: newUser.id,
                subscription: "FREE"
            }
        });

        return { success: "Account created! Please log in." };

    } catch (error) {
        console.error("Registration Error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
// ============================================================================
// INVESTOR LOGIN
// ============================================================================
export async function investorLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { error: "Invalid credentials." };

        if (user.password) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) return { error: "Invalid credentials." };
        } else {
            return { error: "Please set a password specifically for this account." };
        }

        if (user.role !== "INVESTOR") {
            return { error: "This account is not authorized as an Investor." };
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard/investor",
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}

// ============================================================================
// INVESTOR REGISTRATION
// ============================================================================
export async function registerInvestor(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const mobile = formData.get("mobile") as string;
    const password = formData.get("password") as string;

    // Investor Specifics
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const website = formData.get("website") as string;
    const focusAreas = formData.getAll("focusAreas") as string[]; // Multi-select handled as array

    if (!name || !email || !username || !password || !company || !position) {
        return { error: "Required fields missing." };
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                    mobile ? { mobile } : {}
                ]
            }
        });

        if (existingUser) {
            return { error: "User with this email, username, or mobile already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Transaction to ensure both User and Investor profile are created
        await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    username,
                    mobile: mobile || null,
                    password: hashedPassword,
                    role: "INVESTOR",
                }
            });

            await tx.investor.create({
                data: {
                    userId: newUser.id,
                    company,
                    position,
                    linkedinUrl,
                    portfolioUrl: website,
                    focusAreas: focusAreas.length > 0 ? focusAreas : ["General"], // Default if empty
                }
            });
        });

        return { success: "Investor account created! Please log in." };

    } catch (error) {
        console.error("Investor Algo Registration Error:", error);
        return { error: "Registration failed. Please try again." };
    }
}
