import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@/components/providers/ClerkProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import RouteLoader from "@/components/route-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Diary",
  description: "Start sharing your thoughts...!",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clerk user sync with Prisma
  const user = await currentUser();

  if (user) {
    try {
      const loggedInUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id },
      });

      if (!loggedInUser) {
        await prisma.user.create({
          data: {
            name: user.fullName || `${user.firstName} ${user.lastName}`,
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
          },
        });
        console.log("✅ New user created in database:", user.id);
      }
    } catch (error) {
      console.error("❌ Error syncing user with database:", error);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <RouteLoader>
              {children}
            </RouteLoader>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
