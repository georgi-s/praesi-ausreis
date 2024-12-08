import axios, { AxiosError } from "axios";
import { CommentData, Comment } from "@/types/comment";

const handleError = (error: unknown, errorMessage: string) => {
  console.error(errorMessage, error);
  if (error instanceof AxiosError) {
    alert(`${errorMessage}: ${error.response?.data?.error || error.message}`);
  } else {
    alert(errorMessage);
  }
};

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await axios.get<CommentData[]>("/api/comments");
    return response.data.map((comment) => ({
      ...comment,
      timestamp: new Date(comment.createdAt).toLocaleString(),
    }));
  } catch (error) {
    handleError(error, "Fehler beim Laden der Kommentare");
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
    const response = await axios.post<CommentData>("/api/comments", {
      content,
      positionX,
      positionY,
      slideIndex,
      parentId,
    });
    console.log("Kommentar hinzugefügt:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, "Fehler beim Hinzufügen des Kommentars");
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
    const response = await axios.put<CommentData>(`/api/comments/${id}`, {
      content,
      positionX,
      positionY,
    });
    return response.data;
  } catch (error) {
    handleError(error, "Fehler beim Aktualisieren des Kommentars");
    return null;
  }
};

export const deleteComment = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`/api/comments/${id}`);
    return true;
  } catch (error) {
    handleError(error, "Fehler beim Löschen des Kommentars");
    return false;
  }
};

export const toggleCommentCompletion = async (
  id: string
): Promise<CommentData | null> => {
  try {
    const response = await axios.patch<CommentData>(`/api/comments/${id}/complete`);
    console.log("Kommentar Status geändert:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, "Fehler beim Ändern des Kommentar-Status");
    return null;
  }
};
