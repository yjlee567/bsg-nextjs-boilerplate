import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  // const currentPath = request.nextUrl.pathname;
  // const mainPath = currentPath.split("/")[1];
  // const atk = request.cookies.get("atk");

  // // TEMP
  // // 로그인 안 한 경우, 로그인 페이지로 리다이렉트
  // if (!atk && !currentPath.includes("/login")) {
  //   return NextResponse.redirect(new URL(`${mainPath}/login`, request.nextUrl.origin));
  // }

  // // 로그인 한 경우, 로그인 페이지 접속하면 메인 페이지로 리다이렉트
  // if (atk && currentPath.includes("/login")) {
  //   return NextResponse.redirect(new URL(mainPath, request.nextUrl.origin));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * 다음 목록들로 시작되는 경로를 미들웨어 체크에서 제외하기:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
