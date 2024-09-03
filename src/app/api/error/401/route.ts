import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Unauthorized. 권한없음. 로그인 필요", status: 401 },
    { status: 401 },
  );
}
