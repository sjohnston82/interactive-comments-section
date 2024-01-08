import prisma from "../../helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
