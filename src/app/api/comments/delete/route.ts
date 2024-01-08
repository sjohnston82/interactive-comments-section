import prisma from "@/app/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { commentId, parentId } = res;

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  const parentComment = await prisma.comment.findUnique({
    where: { id: parentId },
  });

  const updatedReplies = parentComment?.replies.filter(
    (reply) => reply !== commentId
  );

  if (parentComment?.replies.includes(commentId)) {
    await prisma.comment.update({
      where: {
        id: parentId,
      },
      data: {
        replies: {
          set: updatedReplies,
        },
      },
    });
  }

  return NextResponse.json({ message: "Deleted comment." }, { status: 200 });
}
