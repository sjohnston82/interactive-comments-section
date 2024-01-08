"use client";

import type { Comment, CommentList, Users } from "@/app/helpers/types/types";
import React, { useContext, useState } from "react";
import { Context } from "@/app/components/providers/Context";
import { useComments } from "../hooks/useComments";
import CommentHeader from "./CommentHeader";
import Score from "./Score";
import ReplyButton from "./ReplyButton";
import ReplyContainer from "./ReplyContainer";
import EditDeleteContainer from "./EditDeleteContainer";
import HighlightedText from "./HighlightedText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import Link from "next/navigation";

type CommentProps = {
  comment: Comment;
  users: Users;
};

const Comment = ({ comment, users }: { comment: Comment; users: Users }) => {
  // const { message, replies, userId } = comment;
  const { windowSize } = useContext(Context);
  const { data: comments } = useComments();

  const [replying, setReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.message);

  const queryClient = useQueryClient();

  const currentUser = "1";

  const sortedReplies = comment.replies?.slice().sort((a, b) => {
    const commentA = comments?.find((c) => c.id === a);
    const commentB = comments?.find((c) => c.id === b);

    if (commentA && commentB) {
      return commentB.likes.length - commentA.likes.length;
    }

    return 0;
  });

  const { mutate: editComment } = useMutation({
    mutationFn: async () => {
      await axios.patch("api/comments/edit", {
        commentId: comment.id,
        newMessage: editedComment,
      });
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // pattern to detect @mentions
  const regex = /(@[a-zA-Z0-9_]+|\s+)/g;

  const commentAuthor = users.find((user) => user.id === comment.userId);

  return (
    <>
      <DeleteModal
        onClose={() => console.log("poop")}
        onDelete={() => console.log("poop")}
      />
      <div className="flex flex-col gap-4">
        <div className="bg-white flex flex-col p-4 rounded-lg ">
          {windowSize.innerWidth > 767 && commentAuthor && (
            <Score likes={comment.likes} user={currentUser} id={comment.id} />
          )}
          {commentAuthor && (
            <>
              <CommentHeader
                user={commentAuthor}
                createdAt={comment.createdAt}
                userId={comment.userId}
                currentUser={currentUser}
              />
              {isEditing ? (
                <textarea
                  value={editedComment}
                  name=""
                  id=""
                  cols={20}
                  rows={3}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="border-moderate-blue outline border-1 outline-moderate-blue"
                ></textarea>
              ) : (
                <HighlightedText text={comment.message} pattern={regex} />
              )}

              {windowSize.innerWidth < 768 && (
                <div className="flex justify-between">
                  <Score
                    likes={comment.likes}
                    user={currentUser}
                    id={comment.id}
                  />
                  {comment.userId === currentUser ? (
                    <EditDeleteContainer
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      editComment={editComment}
                      comment={comment}
                    />
                  ) : (
                    <ReplyButton setReplying={setReplying} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {replying && (
          <ReplyContainer
            currentUser={currentUser}
            parent={comment.id}
            setReplying={setReplying}
          />
        )}
        <div className="">
          {comment?.replies?.length! > 0 && (
            <div className="pl-4 flex flex-col  rounded-lg">
              {sortedReplies?.map((reply) => (
                <Comment
                  key={reply}
                  comment={comments?.find((comment) => comment.id === reply)!}
                  users={users}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
