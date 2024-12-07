import { authOptions } from "@/auth"; 
import NextAuth from "next-auth";

const authHandler = NextAuth(authOptions);

export async function GET(req: Request, res: Response) {
  return authHandler(req, res);
}

export async function POST(req: Request, res: Response) {
  return authHandler(req, res);
}
