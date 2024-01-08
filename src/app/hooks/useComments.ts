import axios from "axios";
import { CommentList } from "../helpers/types/types";
import { useQuery } from "@tanstack/react-query";

const fetchComments = async () => {
  const { data: commentData } = await axios.get("/api/comments");

  return commentData.comments as CommentList;
};

export const useComments = () =>
  useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });
