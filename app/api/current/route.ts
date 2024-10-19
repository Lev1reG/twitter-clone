import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const { currentUser } = await serverAuth(req, res);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
