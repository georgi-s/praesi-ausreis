"use client";

import React, { useState } from "react";
import { MessageCircle, Edit, Trash, Check } from "lucide-react";
import { Comment } from "@/types/comment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/LoginButton"; 
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  addComment,
  updateComment,
  deleteComment,
  toggleCommentCompletion,
} from "@/app/lib/api/commentClient";

interface CommentSidebarProps {
  currentSlide: number;
  comments: Comment[];
  mutateComments: () => void;
  userAvatar: string;
  userName: string;
  currentUserId: string;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  currentSlide,
  comments,
  mutateComments,
  userAvatar,
  userName,
  currentUserId,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyToComment, setReplyToComment] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddComment = async (content: string) => {
    if (!content.trim()) return;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          slideIndex: currentSlide,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Hinzufügen des Kommentars"
        );
      }

      await mutateComments();
      setNewComment("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Kommentars:", error);
    }
  };

  const handleUpdateComment = async (id: string, content: string) => {
    const updatedComment = await updateComment(id, content, 0, 0);
    if (updatedComment) {
      setEditingCommentId(null);
      setEditContent("");
      mutateComments();
    }
  };

  const handleDeleteComment = async (id: string) => {
    const success = await deleteComment(id);
    if (success) {
      mutateComments();
    }
  };

  const handleToggleCompletion = async (id: string) => {
    const updatedComment = await toggleCommentCompletion(id);
    if (updatedComment) {
      mutateComments();
    }
  };

  const handleAddReply = async (parentId: string, content: string) => {
    if (!content.trim()) return;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          slideIndex: currentSlide,
          parentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Hinzufügen der Antwort"
        );
      }

      await mutateComments();
      setReplyContent("");
      setReplyToComment(null);
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Antwort:", error);
    }
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    type: "comment" | "reply" = "comment"
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (type === "comment" && newComment.trim()) {
        await handleAddComment(newComment);
      } else if (type === "reply" && replyContent.trim() && replyToComment) {
        await handleAddReply(replyToComment, replyContent);
      }
    }
  };

  const filteredComments = comments.filter(
    (comment) => comment.slideIndex === currentSlide
  );
  const mainComments = filteredComments.filter((comment) => !comment.parentId);
  const replyComments = filteredComments.filter((comment) => comment.parentId);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          {filteredComments.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filteredComments.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] bg-white backdrop-blur-sm">
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DrawerTitle>Kommentare</DrawerTitle>
            <LoginButton />
          </div>
        </DrawerHeader>
        <div className="px-4 max-w-2xl mx-auto w-full">
          <div className="relative mb-4">
            <textarea
              placeholder="Schreibe einen Kommentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "comment")}
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
              rows={3}
            />
            <div className="absolute bottom-3 right-3">
              <Button
                onClick={() =>
                  newComment.trim() && handleAddComment(newComment)
                }
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Senden
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="h-[calc(85vh-200px)] pr-4">
            {filteredComments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500 text-lg">
                  Keine Kommentare für diese Folie.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pb-8">
                {mainComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <img
                          src={userAvatar}
                          alt={userName}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="font-medium text-gray-900">
                          {comment.user?.name}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm ml-auto">
                        {new Date(comment.timestamp).toLocaleString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
                          rows={3}
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            onClick={() =>
                              handleUpdateComment(comment.id, editContent)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Speichern
                          </Button>
                          <Button
                            onClick={() => setEditingCommentId(null)}
                            variant="outline"
                          >
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                        <div className="flex justify-end items-center space-x-2">
                          {currentUserId === comment.user?.id && (
                            <>
                              <Button
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditContent(comment.content);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-blue-600"
                              >
                                <Edit size={16} className="mr-1" />
                                Bearbeiten
                              </Button>
                              <Button
                                onClick={() => handleDeleteComment(comment.id)}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-600"
                              >
                                <Trash size={16} className="mr-1" />
                                Löschen
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => handleToggleCompletion(comment.id)}
                            variant="ghost"
                            size="sm"
                            className={`${
                              comment.isCompleted
                                ? "bg-green-50 text-green-600"
                                : "text-gray-500 hover:text-green-600"
                            }`}
                          >
                            <Check size={16} className="mr-1" />
                            {comment.isCompleted
                              ? "Erledigt"
                              : "Als erledigt markieren"}
                          </Button>
                          <Button
                            onClick={() => setReplyToComment(comment.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            Antworten
                          </Button>
                        </div>

                        {replyToComment === comment.id && (
                          <div className="mt-4 space-y-3">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, "reply")}
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
                              rows={3}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() =>
                                  handleAddReply(comment.id, replyContent)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Antworten
                              </Button>
                              <Button
                                onClick={() => setReplyToComment(null)}
                                variant="outline"
                              >
                                Abbrechen
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Replies */}
                    {replyComments
                      .filter((reply) => reply.parentId === comment.id)
                      .map((reply) => (
                        <div
                          key={reply.id}
                          className="mt-4 ml-8 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100"
                        >
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              <img
                                src={userAvatar}
                                alt={userName}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <span className="font-medium text-gray-900">
                                {reply.user?.name}
                              </span>
                            </div>
                            <span className="text-gray-400 text-sm ml-auto">
                              {new Date(reply.timestamp).toLocaleString(
                                "de-DE",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                            {reply.content}
                          </p>
                          {currentUserId === reply.user?.id && (
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => handleDeleteComment(reply.id)}
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-600"
                              >
                                <Trash size={16} className="mr-1" />
                                Löschen
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentSidebar;
