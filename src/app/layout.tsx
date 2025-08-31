import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryComponent from "@/components/QueryComponent";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Small",
  description: "Yeni Nesil Blog",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black`} >
        <QueryComponent>
          <Header />
          <main className="flex-1 px-6 py-8">
            {children}
          </main>
          <Footer />
        </QueryComponent>
      </body>
    </html>
  );
}
