import type { Metadata } from "next";
import { Geist, Geist_Mono, Staatliches } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Dialog } from "@radix-ui/react-dialog";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glitch Store",
  description: "Digital Game Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${staatliches.className} ${staatliches.variable} antialiased`}
      >
        <Dialog>
          <Header />
          {children}
          <Footer />
        </Dialog>
      </body>
    </html>
  );
}
