"use client";

import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewCommentContainer = () => {
  const [newComment, setNewComment] = useState("");
  const { data: users } = useUsers();
  const currentUser = "1";
  const user = users?.find((user) => user.id === currentUser);
  const queryClient = useQueryClient();

  const { mutate: addNewComment } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/comments/create", {
        userId: user?.id,
        message: newComment,
      });
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="min-w-full rounded-lg p-3 bg-white flex flex-col gap-2">
      <textarea
        name=""
        id=""
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        cols={12}
        rows={3}
        placeholder="Add a comment..."
        className="w-full outline outline-light-gray outline-1 rounded"
      ></textarea>
      {user && (
        <div className="flex justify-between">
          <Image src={user.image} alt="Avatar" width={20} height={20} />
          <button
            className="bg-moderate-blue text-white py-1 px-2 rounded-lg"
            onClick={() => addNewComment()}
          >
            SEND
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCommentContainer;
