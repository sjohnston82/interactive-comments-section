import prisma from "@/app/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  const { commentId, newMessage } = res;

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      message: newMessage,
    },
  });

  return NextResponse.json({ message: "Updated comment." }, { status: 200 });
}
