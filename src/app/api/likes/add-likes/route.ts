import prisma from "@/app/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const res = await request.json();
  const { commentId, user } = res;

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    console.error("Comment not found");
    return;
  }

  if (comment.likes.includes(user)) {
    return Response.json({ message: "User has already likes this comment." });
  }

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      likes: {
        push: user,
      },
    },
  });

  return NextResponse.json({ res });
}
