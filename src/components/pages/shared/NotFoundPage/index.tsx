"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useBasePath } from "@/hooks";

const NotFoundPage = () => {
  const router = useRouter();
  const { goHomePage } = useBasePath();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h2 className="font-medium">페이지를 찾을 수 없습니다.</h2>
      <div className="text-muted-foreground">입력하신 주소가 정확한지 다시 한 번 확인해주세요.</div>
      <div className="flex gap-2">
        <Button variant="primary" onClick={goHomePage} size={"sm"}>
          메인 페이지
        </Button>
        <Button variant="muted" onClick={goBack} size={"sm"}>
          이전 페이지
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
