export type Comment = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  parentId: string | null;
  commentScore: number | null;
  replyingTo: string | null;
  replies?: string[];
  userName: string;
  likes: string[];
};

export type CommentList = Comment[];

export type User = {
  id: string;
  name: string;
  image: string;
};

export type Users = User[];
