import prisma from "@/app/helpers/prisma";

export async function PUT(request: Request) {
  const res = await request.json();
  const { commentId, user } = res;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    console.error("Comment not found");
    return;
  }

  if (!comment.likes.includes(user)) {
    return Response.json({ message: "User has not liked this comment." });
  }

  const updatedLikes = comment.likes.filter((userId) => userId !== user);

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      likes: updatedLikes,
    },
  });

  return Response.json({ res });
}
