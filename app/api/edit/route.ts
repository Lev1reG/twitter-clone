import client from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();

    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      return NextResponse.json(
        { message: "Name and username are required." },
        { status: 400 },
      );
    }

    const updatedUser = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
