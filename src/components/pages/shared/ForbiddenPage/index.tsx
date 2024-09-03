"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useBasePath } from "@/hooks";

const ForbiddenPage = () => {
  const router = useRouter();
  const { goHomePage } = useBasePath();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h2 className="font-medium">접근 권한이 없습니다.</h2>
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

export default ForbiddenPage;
