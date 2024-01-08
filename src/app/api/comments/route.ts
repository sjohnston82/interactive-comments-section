import prisma from "../../helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const comments = await prisma.comment.findMany();

    return NextResponse.json({ comments });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
