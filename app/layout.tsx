import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../utils/navbar.util";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meal Order",
  description: "Pizza Meal Order App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-stone-950 text-stone-100 h-screen w-screen`}
      >
        <NavBar /> 
        <main className="mb-6">{children}</main>
      </body>
    </html>
  );
}
