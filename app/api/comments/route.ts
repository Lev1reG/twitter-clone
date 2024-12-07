import client from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const reqBody = await req.json();
    const { body } = reqBody;

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await client.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
