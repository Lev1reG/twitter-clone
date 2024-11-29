import { NextResponse } from "next/server";
import client from "@/libs/prismadb";

export async function GET() {
  try {
    const users = await client.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 400 });
  }
}
