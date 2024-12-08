export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  user: User;
  slideIndex: number;
  positionX: number;
  positionY: number;
  parentId?: string;
  isCompleted: boolean;
}

export interface Comment extends Omit<CommentData, 'createdAt'> {
  timestamp: string;
}
