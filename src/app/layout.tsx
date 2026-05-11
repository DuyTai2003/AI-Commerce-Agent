import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/lib/i18n/I18nContext";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Commerce Agent | Bản địa hóa sản phẩm 1688",
  description: "Công cụ AI giúp bạn dịch và viết lại nội dung sản phẩm từ 1688.com sang tiếng Việt chuẩn SEO cho Shopee, TikTok Shop.",
  keywords: ["1688", "dịch sản phẩm", "AI", "Shopee", "dropshipping", "bản địa hóa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.className}>
      <body className="min-h-screen antialiased">
        <I18nProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-4 py-8">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
