import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "DGRM MUSEUM",
  description: "동그라미 사진전",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} dark`}>
      <body className="antialiased font-sans bg-neutral-950 text-neutral-100 selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}