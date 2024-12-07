import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const userId = (await params).userId;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const notifications = await client.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
