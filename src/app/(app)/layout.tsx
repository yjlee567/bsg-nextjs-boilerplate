import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import { GlobalLayout, PortalLayout } from "@/layout";
import { pretendard } from "@/app/font";

export const metadata: Metadata = {
  title: "BSG Portal",
  description: "BSG Portal",
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
          <PortalLayout>{children}</PortalLayout>
        </GlobalLayout>
      </body>
    </html>
  );
}
