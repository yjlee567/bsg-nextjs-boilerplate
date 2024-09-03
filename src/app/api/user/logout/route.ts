import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "로그아웃", status: 200 },
    { status: 200, headers: { "set-cookie": "atk=; path=/; Max-Age=0" } },
  );
}
