import { ReactNode } from "react";
import "@/app/globals.css";
import { pretendard } from "@/app/font";
import { LoginGlobalLayout } from "@/layout";

export const metadata = {
  title: "BSG Portal 로그인",
  description: "BSG Portal 로그인",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <LoginGlobalLayout>{children}</LoginGlobalLayout>
      </body>
    </html>
  );
}
