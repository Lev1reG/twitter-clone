import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const userId = (await params).userId;

    if (!userId || typeof userId !== "string") {
      return new NextResponse("Invalid user ID", { status: 400 });
    }

    const existingUser = await client.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await client.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json(
      { ...existingUser, followersCount },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
