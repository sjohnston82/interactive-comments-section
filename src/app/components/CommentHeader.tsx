import React from "react";
import Image from "next/image";
import type { User } from "@/app/helpers/types/types";
import { formatCreatedDate } from "../helpers/formatDate";

const CommentHeader = ({
  user,
  createdAt,
  userId,
  currentUser,
}: {
  user: User;
  createdAt: Date;
  userId: string;
  currentUser: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Image src={user.image} alt="Avatar" width="20" height="20" />
      <p>{user.name}</p>
      {userId === currentUser && (
        <span className="bg-moderate-blue bold text-white px-1">you</span>
      )}
      <p className="">{formatCreatedDate(createdAt)}</p>
    </div>
  );
};

export default CommentHeader;
