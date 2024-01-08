"use client";

import type { Comment, CommentList, Users } from "@/app/helpers/types/types";
import React, { useContext, useState } from "react";
import { Context } from "@/app/components/providers/Context";
import { useComments } from "../hooks/useComments";
import CommentHeader from "./CommentHeader";
import Score from "./Score";
import ReplyButton from "./ReplyButton";
import ReplyContainer from "./ReplyContainer";

type CommentProps = {
  comment: Comment;
  users: Users;
};

const Comment = ({ comment, users }: { comment: Comment; users: Users }) => {
  // const { message, replies, userId } = comment;
  const { windowSize } = useContext(Context);
  const { data: comments } = useComments();
  const [replying, setReplying] = useState(false);

  const currentUser = "1";

  const sortedReplies = comment.replies?.slice().sort((a, b) => {
    const commentA = comments?.find((c) => c.id === a);
    const commentB = comments?.find((c) => c.id === b);

    if (commentA && commentB) {
      return commentB.likes.length - commentA.likes.length;
    }

    return 0;
  });

  const commentAuthor = users.find((user) => user.id === comment.userId);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white flex flex-col p-4 rounded-lg ">
        {windowSize.innerWidth > 767 && commentAuthor && (
          <Score likes={comment.likes} user={currentUser} id={comment.id} />
        )}
        {commentAuthor && (
          <>
            <CommentHeader user={commentAuthor} createdAt={comment.createdAt} />
            <p className="">{comment.message}</p>
            {windowSize.innerWidth < 768 && (
              <div className="flex justify-between">
                <Score
                  likes={comment.likes}
                  user={currentUser}
                  id={comment.id}
                />
                <ReplyButton setReplying={setReplying} />
              </div>
            )}
          </>
        )}
      </div>
      {replying && <ReplyContainer currentUser={currentUser} parent={comment.id} setReplying={setReplying} />}
      <div className="">
        {comment.replies?.length! > 0 && (
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
  );
};

export default Comment;
