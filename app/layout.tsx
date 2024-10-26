import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../utils/navbar.util";
import SideBar from "@/utils/sideBar.util";

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
      <body className={`${inter.className}`}>
        <NavBar />
        <main className="grid grid-cols-12">
          <section className="col-span-1 bg-gray-300 min-h-screen">
            <SideBar />
          </section>
          <section className="col-span-11 bg-stone-950 min-h-screen">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
