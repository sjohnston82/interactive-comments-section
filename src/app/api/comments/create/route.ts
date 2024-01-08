import prisma from "@/app/helpers/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { userId, message } = res;

  if (message === "")
    return NextResponse.json({
      message: "You cannot submit an empty comment.",
    });
  try {
    await prisma.comment.create({
      data: {
        message,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "There was a problem creating comment." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Comment created successfully" },
    { status: 200 }
  );
}
