import { Geist, Geist_Mono } from "next/font/google"; // 1. 폰트 불러오기
import "./globals.css";

export const metadata = {
  title: "DGRM MUSEUM",
  description: "동그라미 사진전",
};

// 2. 폰트 설정 (변수명: geistSans)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. className에서 변수명 확인: geistSans.variable (소문자 g)
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased font-sans bg-neutral-950 text-neutral-100 selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}