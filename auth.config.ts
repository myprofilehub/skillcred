import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
    providers: [], // Providers are added in auth.ts
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnLandingHome = nextUrl.pathname.startsWith('/landing/home');
            const isAuthPage = nextUrl.pathname.startsWith('/auth') && !nextUrl.pathname.startsWith('/api/auth');

            // Helper to check for public domains (Free Tier)
            const isFreeUser = (user: any) => {
                if (user.role !== "STUDENT") return false; // Mentors/HRs are never "free users"
                if (user.lmsEmail) return false; // Has LMS access

                const email = user.email || "";
                const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com"];
                const domain = email.split('@')[1];
                return publicDomains.includes(domain);
            };

            // 2. Dashboard Access (Strict LMS)
            if (isOnDashboard) {
                if (isLoggedIn) {
                    if (isFreeUser(auth.user)) {
                        // Redirect Free Users to their dedicated landing page
                        return NextResponse.redirect(new URL('/', nextUrl));
                    }

                    // Force Password Change Check
                    if ((auth.user as any).forcePasswordChange === true) {
                        return NextResponse.redirect(new URL('/auth/reset-password', nextUrl));
                    }

                    return true;
                }
                return false; // Redirect unauthenticated to login
            }

            // 3. Prevent Logged-in Users from accessing Auth pages (Login/Signup)
            if (isAuthPage) {
                if (isLoggedIn) {
                    // Allow access to reset password page if forced
                    if (nextUrl.pathname === '/auth/reset-password') {
                        if ((auth.user as any).forcePasswordChange) {
                            return true;
                        }
                        return NextResponse.redirect(new URL('/dashboard', nextUrl));
                    }

                    if (isFreeUser(auth.user)) {
                        return NextResponse.redirect(new URL('/', nextUrl));
                    }
                    return NextResponse.redirect(new URL('/dashboard', nextUrl));
                }
                return true;
            }

            // Allow access to public landing page (/) for everyone
            if (nextUrl.pathname === "/") return true;

            return true;
        },
        async session({ session, token }: any) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
                session.user.role = token.role as any;
                session.user.username = token.username as string | null;
                (session.user as any).lmsEmail = token.lmsEmail as string | null;
                (session.user as any).forcePasswordChange = token.forcePasswordChange as boolean;
                session.accessToken = token.accessToken as string;
                session.error = token.error as string | undefined;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },

} satisfies NextAuthConfig
