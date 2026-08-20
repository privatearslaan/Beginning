import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopStrip } from "@/components/layout/TopStrip";
import { SupportBot } from "@/components/layout/SupportBot";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { AnimalBackground } from "@/components/background/AnimalBackground";
import { auth } from "@/lib/auth";
import { getCartCount } from "@/actions/cart";
import { SITE } from "@/lib/site";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={`${raleway.variable} h-full antialiased`}
    >
      <body className="site-shell min-h-full flex flex-col bg-background text-ink pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-[env(safe-area-inset-bottom)]">
        <AnimalBackground />
        <div className="site-shell__content relative z-10 flex min-h-full flex-1 flex-col">
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
        </div>
      </body>
    </html>
  );
}
