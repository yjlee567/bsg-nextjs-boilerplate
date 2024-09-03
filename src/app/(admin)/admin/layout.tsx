import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import { GlobalLayout } from "@/layout";
import { pretendard } from "@/app/font";
import AdminGlobalLayout from "@/layout/AdminGlobalLayout";

export const metadata: Metadata = {
  title: "BSG Portal Admin",
  description: "BSG Portal Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <GlobalLayout>
          <AdminGlobalLayout>{children}</AdminGlobalLayout>
        </GlobalLayout>
      </body>
    </html>
  );
}
