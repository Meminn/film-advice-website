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
  title: "Movice - Movie Advice for Every Mood",
  description: "Get personalized movie advice based on your mood and feelings",
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
            <header className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="container flex h-16 items-center justify-between">
                <nav className="flex items-center space-x-6">
                  {/* Navigation items will go here */}
                </nav>
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
