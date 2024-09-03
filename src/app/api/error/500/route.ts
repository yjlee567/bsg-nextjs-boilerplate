import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Internal server error 서버에러", status: 500 },
    { status: 500 },
  );
}
