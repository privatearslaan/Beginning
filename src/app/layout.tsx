import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { auth } from "@/lib/auth";
import { getCartCount } from "@/actions/cart";
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
    default: "Pawfect Pets — Your Neighborhood Pet Shop",
    template: "%s | Pawfect Pets",
  },
  description:
    "Quality pet products, grooming services, and expert care for dogs, cats, and more.",
  openGraph: {
    title: "Pawfect Pets",
    description: "Quality pet products, grooming services, and expert care.",
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
      <body className="min-h-full flex flex-col bg-cream text-stone-900 pb-[env(safe-area-inset-bottom)]">
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
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
