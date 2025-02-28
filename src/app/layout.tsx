import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Moodvice - Movie Advice for Every Mood",
  description: "Get personalized movie advice based on your mood and feelings",
  keywords: ["movies", "film recommendations", "mood-based movies", "cinema", "film suggestions"], // Google artık çok dikkate almıyor ama eklenebilir
  icons: {
    icon: "/favicon.ico", // Custom favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Mehmet Emin Bayrak", url: "https://Meminn.github.io/#/fs" }], // İçerik oluşturucu bilgisi
  creator: "Mehmet Emin Bayrak", // Site sahibi bilgisi
  openGraph: {
    title: "Moodvice - Movie Advice for Every Mood",
    description: "Get personalized movie advice based on your mood and feelings.",
    url: "https://moodvice.vercel.app", // Sayfanın URL'si
    siteName: "Moodvice",
    images: [
      {
        url: "https://moodvice.vercel.app/og-image.png", // Öne çıkan görsel URL'si (sayfanın paylaşım önizlemesinde görünür)
        width: 1200,
        height: 630,
        alt: "Moodvice Movie Recommendation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moodvice - Movie Advice for Every Mood",
    description: "Get personalized movie advice based on your mood and feelings.",
    images: ["https://moodvice.vercel.app/og-image.png"], // Twitter için özel görsel
    //creator: "@moodvice", // Twitter handle (varsa ekleyebilirsin)
  },
  alternates: {
    canonical: "https://moodvice.vercel.app", // SEO açısından önemli (Google’ın sayfanın esas URL'sini anlamasına yardımcı olur)
  },
  robots: {
    index: true, // Sayfanın indekslenmesini sağlar
    follow: true, // Linklerin takip edilmesine izin verir
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
            <header className="fixed top-0 z-50 w-full bg-background">
              <div className=" flex h-16 items-center justify-end">
              <ThemeToggle />
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <footer className="border-t">
              <div className="container flex h-16 items-center">
                <p className="text-sm text-muted-foreground">
                  © 2024 Moodvice. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
