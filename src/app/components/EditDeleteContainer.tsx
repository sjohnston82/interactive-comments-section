"use client";

import React from "react";
import Trashcan from "../../../public/images/icon-delete.svg";
import EditIcon from "../../../public/images/icon-edit.svg";
import Image from "next/image";
import { UseMutateFunction } from "@tanstack/react-query";
import { Comment } from "../helpers/types/types";
import { useRouter } from "next/navigation";

const EditDeleteContainer = ({
  isEditing,
  setIsEditing,
  editComment,
  comment,
}: {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editComment: UseMutateFunction<void, Error, void, unknown>;
  comment: Comment;
}) => {
  const router = useRouter();
  
  // console.log(comment)
  return isEditing ? (
    <button
      className="bg-moderate-blue text-white font-bold px-1 rounded-lg"
      onClick={() => editComment()}
    >
      Update
    </button>
  ) : (
    <div className="flex gap-2">
      <div
        className="flex items-center"
        onClick={() =>
          router.push(
            `/?showModal=y&commentId=${comment.id}&parentId=${comment.parentId}`
          )
        }
      >
        <Image src={Trashcan} alt="Delete icon" />
        <p className="text-soft-red bold">Delete</p>
      </div>
      <div className="flex items-center" onClick={() => setIsEditing(true)}>
        <Image src={EditIcon} alt="Edit icon" />
        <p className="text-moderate-blue bold">Edit</p>
      </div>
    </div>
  );
};

export default EditDeleteContainer;
