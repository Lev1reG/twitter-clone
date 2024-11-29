import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
