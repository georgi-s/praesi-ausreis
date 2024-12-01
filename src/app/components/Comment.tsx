import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface CommentProps {
  id: string;
  content: string;
  position: { x: number; y: number };
  onUpdate: (
    id: string,
    content: string,
    position: { x: number; y: number }
  ) => void;
  onDelete: (id: string) => void;
  userName: string;
}

export const Comment: React.FC<CommentProps> = ({
  id,
  content,
  position,
  onUpdate,
  onDelete,
  userName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Comment rendered:", id, content, currentPosition);
  }, [id, content, currentPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && commentRef.current) {
        const newX = e.clientX - commentRef.current.offsetWidth / 2;
        const newY = e.clientY - commentRef.current.offsetHeight / 2;
        console.log("Dragging comment:", id, "to position:", {
          x: newX,
          y: newY,
        });
        setCurrentPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        console.log(
          "Finished dragging comment:",
          id,
          "Final position:",
          currentPosition
        );
        onUpdate(id, content, currentPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, id, content, currentPosition, onUpdate]);

  const handleSave = () => {
    console.log("Saving comment:", id, editedContent, currentPosition);
    onUpdate(id, editedContent, currentPosition);
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Opening delete confirmation for comment:", id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Confirming delete for comment:", id);
    onDelete(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        ref={commentRef}
        className="absolute w-64 shadow-lg cursor-move"
        style={{ left: currentPosition.x, top: currentPosition.y }}
        onMouseDown={() => {
          console.log("Started dragging comment:", id);
          setIsDragging(true);
        }}
      >
        <CardContent className="p-4">
          <p className="font-bold">{userName}</p>
          {isEditing ? (
            <Input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mt-2"
            />
          ) : (
            <p className="mt-2">{content}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button onClick={handleSave} variant="default">
                Speichern
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="secondary">
                Abbrechen
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Bearbeiten
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                Löschen
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};
