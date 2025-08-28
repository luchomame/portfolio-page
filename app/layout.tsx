import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Luis Tupac — Portfolio",
  description: "Software & Data Engineer • Platform • ML/NLP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <Toaster />
        <ThemeProvider>
          <Header />
          <main className="container flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
