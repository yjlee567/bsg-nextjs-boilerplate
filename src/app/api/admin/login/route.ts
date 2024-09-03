import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json({ message: "id or password가 없음" }, { status: 400 });
  }

  try {
    const response = await fetch(`http://localhost:3001/login`);
    const data = await response.json();
    const targetUser = data["admin"].find(
      (user: any) => user.id === id && user.password === password,
    );

    if (!targetUser) {
      return NextResponse.json(
        {
          message: "해당 유저가 없음",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "로그인 성공",
        data: {
          id: targetUser.id,
        },
      },
      {
        headers: {
          "set-cookie": "atk=summer; path=/admin",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "오류가 발생" }, { status: 500 });
  }
}
