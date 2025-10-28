import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../app/lib/gsap"
import Nav from "../components/Nav"; // ✅ Fixed
import { ViewTransitions } from "next-view-transitions";
import SmoothScroller from "@/components/SmoothScroller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Nav />
        <SmoothScroller/>
        {children}
      </body>
    </html>
    </ViewTransitions>
  );
}
