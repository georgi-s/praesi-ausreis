import axios from "axios";
import { CommentData, Comment } from "@/types/comment";

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await axios.get("/api/comments");
    const commentsData: CommentData[] = response.data;

    // Konvertiere CommentData zu Comment, indem timestamp hinzugefügt wird
    const comments: Comment[] = commentsData.map((comment) => ({
      ...comment,
      timestamp: new Date(comment.createdAt).toLocaleString(), // oder ein anderes gewünschtes Format
    }));

    return comments;
  } catch (error) {
    console.error("Fehler beim Laden der Kommentare:", error);
    return [];
  }
};

export const addComment = async (
  content: string,
  positionX: number,
  positionY: number,
  slideIndex: number,
  parentId?: string
): Promise<CommentData | null> => {
  try {
    const response = await axios.post("/api/comments", {
      content,
      positionX,
      positionY,
      slideIndex,
      parentId,
    });
    console.log("Kommentar hinzugefügt:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Kommentars:", error);
    alert(
      "Fehler beim Hinzufügen des Kommentars. Bitte versuchen Sie es erneut."
    );
    return null;
  }
};

export const updateComment = async (
  id: string,
  content: string,
  positionX: number,
  positionY: number
): Promise<CommentData | null> => {
  try {
    const response = await axios.put(`/api/comments/${id}`, {
      content,
      positionX,
      positionY,
    });
    return response.data;
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kommentars:", error);
    return null;
  }
};

export const deleteComment = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`/api/comments/${id}`);
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen des Kommentars:", error);
    return false;
  }
};

export const toggleCommentCompletion = async (
  id: string
): Promise<CommentData | null> => {
  try {
    const response = await axios.patch(`/api/comments/${id}/toggle-completion`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Ändern des Erledigtstatus:", error);
    return null;
  }
};
