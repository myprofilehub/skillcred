import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { authConfig } from "./auth.config"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod";
import bcrypt from "bcryptjs";

async function refreshAccessToken(token: any) {
    try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.AUTH_GOOGLE_ID!,
                client_secret: process.env.AUTH_GOOGLE_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            // console.error("Token refresh failed:", refreshedTokens);
            return {
                ...token,
                error: "RefreshAccessTokenError",
            };
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fallback to old refresh token
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Google({
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/meetings.space.readonly https://www.googleapis.com/auth/gmail.send",
                    access_type: "offline",
                    response_type: "code",
                    prompt: "consent",
                }
            },
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Allow login with either personal email OR LMS email
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { email: email },
                                { lmsEmail: email }
                            ]
                        }
                    });

                    if (!user) {
                        return null;
                    }

                    // If user has no password (e.g. Google auth only), return null
                    if (!user.password) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            // Update token if session update is triggered
            if (trigger === "update" && session?.user) {
                token.forcePasswordChange = session.user.forcePasswordChange;
            }

            if (account) {
                // Initial sign in - attach token from account
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token; 
                token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000;
                
                // Explicitly save the refresh_token to the DB if it exists (e.g. from prompt=consent)
                if (account.refresh_token && user?.id) {
                    try {
                        const existingAccount = await prisma.account.findFirst({
                            where: { provider: account.provider, providerAccountId: account.providerAccountId }
                        });
                        
                        if (existingAccount) {
                            await prisma.account.update({
                                where: { id: existingAccount.id },
                                data: {
                                    refresh_token: account.refresh_token,
                                    access_token: account.access_token,
                                    expires_at: account.expires_at,
                                    token_type: account.token_type,
                                    scope: account.scope,
                                    id_token: account.id_token,
                                }
                            });
                        }
                    } catch (error) {
                        console.error("Failed to save tokens to DB:", error);
                    }
                }
            }

            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.username = (user as any).username;
                token.lmsEmail = (user as any).lmsEmail;
                token.forcePasswordChange = (user as any).forcePasswordChange;
            }

            // Return previous token if the access token has not expired yet
            if (token.accessToken && token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // If the token has already failed to refresh, do not retry continuously.
            // This prevents console spam and infinite loops.
            if (token.error === "RefreshAccessTokenError") {
                return token;
            }

            // Access token has expired OR is missing (but we have refresh token), try to refresh it
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
                session.user.role = token.role as any;
                session.user.username = token.username as string | null; // Add username
                (session.user as any).lmsEmail = token.lmsEmail as string | null;
                (session.user as any).forcePasswordChange = token.forcePasswordChange as boolean;
                session.accessToken = token.accessToken as string;
                session.error = token.error as string | undefined;
            }
            return session;
        },
    }
})
