import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopStrip } from "@/components/layout/TopStrip";
import { SupportBot } from "@/components/layout/SupportBot";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { auth } from "@/lib/auth";
import { getCartCount } from "@/actions/cart";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Pet Shop & Grooming in Anantnag`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const session = await auth();
  const cartCount = await getCartCount();

  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-stone-900 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-[env(safe-area-inset-bottom)]">
        <TopStrip />
        <Header
          cartCount={cartCount}
          user={
            session?.user
              ? { name: session.user.name!, role: session.user.role }
              : null
          }
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <SupportBot />
        <MobileTabBar />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
