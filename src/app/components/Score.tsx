"use client";

import React from "react";
import Image from "next/image";
import Plus from "../../../public/images/icon-plus.svg";
import Minus from "../../../public/images/icon-minus.svg";
import { Comment, User } from "@/app/helpers/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Score = ({
  likes,
  id,
  user,
}: {
  likes: string[];
  id: string;
  user: string;
}) => {
  const score = likes.length;
  const queryClient = useQueryClient();

  const { mutate: addLike } = useMutation({
    mutationFn: async () =>
      await axios.put("/api/likes/add-likes", {
        commentId: id,
        user,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: () => {
      return <div className="">Something went wrong!</div>;
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: async () =>
      await axios.put("/api/likes/remove-likes", {
        commentId: id,
        user,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: () => {
      return <div className="">Something went wrong!</div>;
    },
  });

  return (
    <div className="flex justify-around items-center bg-light-gray  w-20 px-1">
      <Image src={Plus} alt="Add like" onClick={() => addLike()} />

      <p className="">{score}</p>
      <Image src={Minus} alt="Dislike" onClick={() => removeLike()} />
    </div>
  );
};

export default Score;
