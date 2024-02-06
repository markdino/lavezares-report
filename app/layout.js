import { Inter } from "next/font/google";
import "./globals.css";
import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";

import sharedContent from "@/config/sharedContent.json";

const inter = Inter({ subsets: ["latin"] });
const { title, description } = sharedContent;

export const metadata = { title, description };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <StickyNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
