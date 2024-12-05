import { User } from "@prisma/client";

export interface CommentData {
  id: string;
  content: string;
  positionX: number;
  positionY: number;
  slideIndex: number;
  user: User;
  parentId: string | null;
  replies: CommentData[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment extends CommentData {
  timestamp: string;
}
