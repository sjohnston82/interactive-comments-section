import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./components/providers/TanstackProvider";
import ContextProvider from "./components/providers/Context";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-[#121212] flex items-center justify-center`}>
        <TanstackProvider>
          <ContextProvider>{children}</ContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
