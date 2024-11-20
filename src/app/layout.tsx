import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Providers from "@/components/base/Providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import Scripts from "@/components/base/Scripts";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/base/Footer";

const Font = Poppins({
  weight: ["500", "600", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adda - CWS",
  description: "A Chat App with Next.js and MongoDB",
  themeColor: "#020817",
  openGraph: {
    title: "Adda - CWS",
    description: "A Chat App with Next.js and MongoDB",
    url: "https://adda-cws.vercel.app",
    siteName: "Adda - CWS",
    type: "website",
  },
  icons: {
    icon: "/img/logoBGRemoved.png",
    shortcut: "/img/logoBGRemoved.png",
    other: {
      rel: "apple-touch-icon",
      url: "/img/favicons/apple-touch-icon.png",
    },
  },
  manifest: "/webmanifest.json",
  metadataBase: new URL("https://adda-cws.vercel.app"),
};

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <html
      lang="en"
      className={clsx("h-full", Font.className)}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-full">
        <Providers session={session}>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}
