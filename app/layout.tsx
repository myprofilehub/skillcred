import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skillcred | Learn. Build. Verify. Get Hired.",
  description: "A platform where students across all streams work on live mentor-supported projects, build verified portfolios, and get hired.",
};

import { auth } from "@/auth";

// ... (inside function)
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
