import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CommentData } from "@/types/comment";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/app/lib/api/commentClient";
import { Comment } from "./Comment";
import CommentDialog from "@/app/components/CommentDialog";

interface CommentManagerProps {
  currentSlide: number;
  commentsEnabled: boolean;
}

export const CommentManager: React.FC<CommentManagerProps> = ({
  currentSlide,
}) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  const [isHoveringComment, setIsHoveringComment] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchComments().then((fetchedComments) => {
        console.log("Fetched comments:", fetchedComments);
        setComments(fetchedComments);
      });
    }
  }, [status]);

  const handleAddComment = (event: React.MouseEvent) => {
    if (status !== "authenticated") {
      alert("Bitte melden Sie sich an, um Kommentare hinzuzufügen.");
      return;
    }
    if (!isHoveringComment) {
      const newPosition = { x: event.clientX, y: event.clientY };
      console.log("Adding new comment at position:", newPosition);
      setCommentPosition(newPosition);
      setIsDialogOpen(true);
    }
  };

  const submitNewComment = async (content: string) => {
    console.log(
      "Submitting new comment:",
      content,
      commentPosition,
      currentSlide
    );
    const newComment = await addComment(
      content,
      commentPosition.x,
      commentPosition.y,
      currentSlide
    );
    if (newComment) {
      console.log("New comment added:", newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    }
    setIsDialogOpen(false);
  };

  const handleUpdateComment = async (
    id: string,
    content: string,
    position: { x: number; y: number }
  ) => {
    console.log("Updating comment:", id, content, position);
    const updatedComment = await updateComment(
      id,
      content,
      position.x,
      position.y
    );
    if (updatedComment) {
      console.log("Comment updated:", updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? {
                ...updatedComment,
                positionX: position.x,
                positionY: position.y,
              }
            : comment
        )
      );
    }
  };

  const handleDeleteComment = async (id: string) => {
    console.log("Deleting comment:", id);
    const success = await deleteComment(id);
    if (success) {
      console.log("Comment deleted successfully");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    }
  };

  return (
    <>
      {comments
        .filter((comment) => comment.slideIndex === currentSlide)
        .map((comment) => (
          <div
            key={comment.id}
            onMouseEnter={() => setIsHoveringComment(true)}
            onMouseLeave={() => setIsHoveringComment(false)}
          >
            <Comment
              id={comment.id}
              content={comment.content}
              position={{ x: comment.positionX, y: comment.positionY }}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
              userName={comment.user.name}
            />
          </div>
        ))}
      <div className="absolute inset-0" onClick={handleAddComment} />
      <CommentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={submitNewComment}
      />
    </>
  );
};
