import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-montserrat" 
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
      <body className={`${montserrat.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
