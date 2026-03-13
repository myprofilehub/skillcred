"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    mobile: z.string().min(10).optional(),
    password: z.string().min(6),
});

export async function registerUser(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const validatedFields = RegisterSchema.safeParse({
        username,
        email,
        mobile,
        password,
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                    { mobile: mobile || undefined }
                ]
            }
        });

        if (existingUser) {
            console.log("Registration failed: User already exists", { email, username, mobile });
            return { error: "User with this Email, Username or Mobile already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating user with:", { username, email, mobile });

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                mobile,
                password: hashedPassword,
                name: username, // default name to username
            },
        });
        console.log("User created:", newUser);

        return { success: "User registered successfully!" };
    } catch (error) {
        console.error("Registration Error Detailed:", error);
        return { error: "Something went wrong during registration." };
    }
}
