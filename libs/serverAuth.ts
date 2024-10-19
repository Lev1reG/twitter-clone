import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import prisma from '@/libs/prismadb';

const serverAuth = async (
  req: Request,
  res: Response
) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;
