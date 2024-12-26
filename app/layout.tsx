import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../utils/navbar.util";
import SideBar from "@/utils/sideBar.util";
import ReduxContext from "@/utils/reduxContext";
import QueryClientContext from "@/utils/queryClientContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <ReduxContext>
          <QueryClientContext>
            <NavBar />
            <main className="grid grid-cols-12">
              <section className="hidden md:block md:col-span-1 bg-gray-300 min-h-screen">
                <SideBar />
              </section>
              <section className="col-span-12 md:col-span-11 bg-stone-950 min-h-screen">
                {children}
              </section>
            </main>
            <ReactQueryDevtools/>
          </QueryClientContext>
        </ReduxContext>
      </body>
    </html>
  );
}
