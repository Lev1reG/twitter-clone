import bcrypt from 'bcryptjs';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, name, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return new NextResponse('Username already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error creating user', { status: 400 });
  }
}
