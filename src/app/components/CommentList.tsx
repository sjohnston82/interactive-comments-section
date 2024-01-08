"use client";

// import { useComments } from "@/context/CommentContext";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import type { CommentList, Users } from "../helpers/types/types";

const CommentsList = () => {
  const fetchComments = async () => {
    const { data: commentData } = await axios.get("/api/comments");

    return commentData.comments as CommentList;
  };

  const fetchUsers = async () => {
    const { data: userData } = await axios.get("/api/users");

    return userData.users as Users;
  };

  const {
    data: commentData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  const {
    data: userData,
    isLoading: isUsersLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isCommentsLoading) return <div className="">Loading comments...</div>;
  if (isUsersLoading) return <div className="">Loading users...</div>;
  if (isUserError || isCommentsError)
    return <div className="">Something went wrong, please try again...</div>;

  const sortedComments = commentData?.slice().sort((a, b) => {
    // Sort in descending order based on the length of the likes array
    return b.likes.length - a.likes.length;
  });

  

  return (
    <div className="bg-gray-500 w-[375px] p-5 flex flex-col ">
      {sortedComments?.map(
        (comment) =>
          comment.parentId === null && userData &&  (
            <Comment key={comment.id} comment={comment} users={userData}  />
          )
      )}
    </div>
  );
};

export default CommentsList;
