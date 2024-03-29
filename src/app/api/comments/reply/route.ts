import prisma from "@/app/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { message, userId, parentCommentId } = res;

  const reply = await prisma.comment.create({
    data: {
      message,
      parent: {
        connect: {
          id: parentCommentId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      user: true,
    },
  });

  const parentComment = await prisma.comment.update({
    where: {
      id: parentCommentId,
    },
    data: {
      replies: {
        push: reply.id,
      },
    },
  });

  return NextResponse.json({ reply }, { status: 200 });
}
