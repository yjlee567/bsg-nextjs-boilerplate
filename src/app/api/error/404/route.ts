import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Not found 페이지 찾을 수 없음", status: 404 },
    { status: 404 },
  );
}
