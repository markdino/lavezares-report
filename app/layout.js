import { Inter } from "next/font/google";
import "./globals.css";
import StickyNavbar from "@/components/StickyNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lavezares Reports",
  description:
    "Empower community well-being by reporting incidents and contributing to a safer environment. Your voice matters in keeping our communities safe, aiding law enforcement, and ensuring justice is served.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <StickyNavbar />
        {children}
      </body>
    </html>
  );
}
