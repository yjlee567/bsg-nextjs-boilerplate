import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Forbidden. 접근금지", status: 403 }, { status: 403 });
}
