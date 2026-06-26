import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin", "vietnamese"], 
  variable: "--font-inter" 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "POSTLAIN // Ngô Phúc — Điều Hành Vận Hành & Sáng Tạo",
  description: "Bản lĩnh quản trị đa lĩnh vực kết hợp tư duy tự động hóa công nghệ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
