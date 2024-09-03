import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await fetch(`http://localhost:3001/data2/`);
    const data = await response.json();
    const targetData = data.find((data: any) => data.id.toString() === id.toString());
    if (targetData) {
      return NextResponse.json({ data: targetData }, { status: 200 });
    }
    return NextResponse.json({ message: "해당 데이터 없음" }, { status: 404 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ message: "오류가 발생" }, { status: 500 });
  }
}
