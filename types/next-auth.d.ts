import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

// ...
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    username?: string | null;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
        accessToken?: string
        error?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole
        username?: string | null
        accessToken?: string
        refreshToken?: string
        accessTokenExpires?: number
        error?: string
    }
}
