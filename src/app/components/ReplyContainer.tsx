import React, { useState } from "react";
import Image from "next/image";
import { useUsers } from "../hooks/useUsers";
import type { Users } from "@/app/helpers/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ReplyContainer = ({
  currentUser,
  parent,
  setReplying,
}: {
  currentUser: string;
  parent: string;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: users } = useUsers();
  const [input, setInput] = useState("");
  const replyingUser = users?.find((user) => user.id === currentUser);
  const queryClient = useQueryClient();

  const { mutate: addReply } = useMutation({
    mutationFn: async () => {
      await axios.post("api/comments/reply", {
        message: input,
        userId: currentUser,
        parentCommentId: parent,
      });
    },
    onSuccess: () => {
      setInput("");
      setReplying(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  return (
    <div className="bg-white rounded-lg flex p-4 items-center justify-between">
      <Image src={replyingUser!.image} alt="Avatar" width={20} height={20} />
      <textarea
        name=""
        id=""
        cols={20}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-moderate-blue outline border-1 outline-moderate-blue"
      ></textarea>
      <button
        type="submit"
        className="bg-moderate-blue text-white rounded-lg p-3"
        onClick={() => addReply()}
      >
        Reply
      </button>
    </div>
  );
};

export default ReplyContainer;
