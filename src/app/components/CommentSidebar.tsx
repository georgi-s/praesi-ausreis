"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Edit,
  Trash,
  Check,
} from "lucide-react";
import { Comment } from "@/types/comment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  currentSlide,
  comments,
  mutateComments,
  userAvatar,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleToggle = useCallback(() => {
    if (isOpen) {
      setIsFullyOpen(false);
      setTimeout(() => setIsOpen(false), 500);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsFullyOpen(true), 500);
    }
  }, [isOpen]);

  const filteredComments = comments.filter(
    (comment) => comment.slideIndex === currentSlide
  );

  const handleAddComment = async (content: string) => {
    const newCommentData = await addComment(content, 0, 0, currentSlide);
    if (newCommentData) {
      setNewComment("");
      mutateComments();
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

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newComment.trim()) {
        await handleAddComment(newComment);
      }
    }
  };

  //if (error) return <div>Failed to load comments</div>;

  return (
    <motion.div
      className="fixed right-0 top-0 h-full flex items-stretch"
      initial={{ x: "calc(100% - 40px)" }}
      animate={{ x: isOpen ? 0 : "calc(100% - 40px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="bg-blue-600 text-white cursor-pointer z-50 flex flex-col items-center justify-between rounded-l-[0.5rem] overflow-hidden"
        initial={{ width: "40px", height: "120px" }}
        animate={{
          width: "40px",
          height: isFullyOpen ? "100%" : "120px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <button
          onClick={handleToggle}
          className="w-full p-2 flex items-center justify-center"
        >
          {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className="p-2 flex flex-col items-center">
          <MessageCircle size={24} />
          <span className="text-sm font-bold">{filteredComments.length}</span>
        </div>
      </motion.div>

      <motion.div
        className="bg-white shadow-lg flex flex-col overflow-hidden"
        initial={{ width: 0, height: "120px" }}
        animate={{
          width: isOpen ? "320px" : 0,
          height: isFullyOpen ? "100%" : "120px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {isFullyOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex flex-col w-full"
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Kommentare</h2>
                <textarea
                  placeholder="Schreibe einen Kommentar..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border p-2 rounded focus:outline-none"
                  rows={3}
                />
              </div>
              <Separator />
              <ScrollArea className="flex-grow">
                <div className="p-4">
                  {filteredComments.length === 0 ? (
                    <p className="text-gray-500">
                      Keine Kommentare für diese Folie.
                    </p>
                  ) : (
                    filteredComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm"
                      >
                        <div className="flex items-center mb-2">
                          <span className="font-semibold">
                            {comment.user?.name}
                          </span>
                          <span className="text-gray-500 text-sm ml-auto">
                            {comment.timestamp}
                          </span>
                        </div>
                        {editingCommentId === comment.id ? (
                          <div>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                            <Button
                              onClick={() =>
                                handleUpdateComment(comment.id, editContent)
                              }
                              className="mr-2"
                            >
                              Speichern
                            </Button>
                            <Button onClick={() => setEditingCommentId(null)}>
                              Abbrechen
                            </Button>
                          </div>
                        ) : (
                          <p className="text-gray-700">{comment.content}</p>
                        )}
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditContent(comment.content);
                            }}
                            className="w-10 h-10 p-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                          >
                            <Edit size={18} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="w-10 h-10 p-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                          >
                            <Trash size={18} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => handleToggleCompletion(comment.id)}
                            className={`w-10 h-10 p-0 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
                              comment.isCompleted
                                ? "bg-gradient-to-bl from-green-400 via-teal-500 to-blue-500 hover:from-green-500 hover:via-teal-600 hover:to-blue-600"
                                : "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700"
                            }`}
                          >
                            <Check size={18} className="text-white" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CommentSidebar;
