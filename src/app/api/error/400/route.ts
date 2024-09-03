import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Bad Request 잘못된 요청!!!!", status: 400 },
    { status: 400 },
  );
}
