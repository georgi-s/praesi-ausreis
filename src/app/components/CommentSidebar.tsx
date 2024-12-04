"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Edit,
  Trash,
  Check,
} from "lucide-react";
import { Comment, CommentData } from "@/types/comment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import io, { Socket } from "socket.io-client";

interface CommentSidebarProps {
  currentSlide: number;
  comments: CommentData[];
  onAddComment: (content: string) => Promise<void>;
  onUpdateComment: (id: string, content: string) => Promise<void>;
  onDeleteComment: (id: string) => Promise<void>;
  onToggleCompletion: (id: string) => Promise<void>;
  userAvatar: string;
  userName: string;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  currentSlide,
  comments,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onToggleCompletion,
  userAvatar,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [cursors, setCursors] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3000",
      {
        path: "/api/socketio",
      }
    );

    socketRef.current.on("connect", () => {
      console.log("Mit WebSocket verbunden");
    });

    socketRef.current.on("cursor-move", (data) => {
      setCursors((prev) => ({
        ...prev,
        [data.userId]: { x: data.x, y: data.y },
      }));
    });

    socketRef.current.on("new-comment", (data) => {
      onAddComment(data.content);
    });

    socketRef.current.on("update-comment", (data) => {
      onUpdateComment(data.id, data.content);
    });

    socketRef.current.on("delete-comment", (id) => {
      onDeleteComment(id);
    });

    socketRef.current.on("toggle-completion", (data) => {
      onToggleCompletion(data.id);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [onAddComment, onUpdateComment, onDeleteComment, onToggleCompletion]);

  const handleToggle = () => {
    if (isOpen) {
      setIsFullyOpen(false);
      setTimeout(() => setIsOpen(false), 500);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsFullyOpen(true), 500);
    }
  };

  const filteredComments = comments.filter(
    (comment) => comment.slideIndex === currentSlide
  );

  const handleAddComment = async (content: string) => {
    await onAddComment(content);
    setNewComment("");
    if (socketRef.current) {
      socketRef.current.emit("new-comment", {
        content,
        slideIndex: currentSlide,
      });
    }
  };

  const handleUpdateComment = async (id: string) => {
    await onUpdateComment(id, editContent);
    setEditingCommentId(null);
    setEditContent("");
    if (socketRef.current) {
      socketRef.current.emit("update-comment", { id, content: editContent });
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

  return (
    <motion.div
      className="fixed right-0 top-0 h-full flex items-stretch"
      initial={{ x: "calc(100% - 40px)" }}
      animate={{ x: isOpen ? 0 : "calc(100% - 40px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="bg-blue-500 text-white cursor-pointer z-50 flex flex-col items-center justify-between rounded-l-[0.5rem] overflow-hidden"
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
                        className="bg-gray-100 rounded-lg p-4 mb-4"
                      >
                        <div className="flex items-center mb-2">
                          <span className="font-semibold">
                            {comment.user?.name}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        {/* <div className="mt-2 flex justify-end space-x-2">
                          <Button
                            onClick={() => setEditingCommentId(comment.id)}
                            className="w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <Edit size={14} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => onDeleteComment(comment.id)}
                            className="w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <Trash size={14} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => onToggleCompletion(comment.id)}
                            className={`w-8 h-8 p-0 rounded-full transition-colors flex items-center justify-center ${
                              comment.isCompleted
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                          >
                            <Check size={14} className="text-white" />
                          </Button>
                        </div> */}
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button
                            onClick={() => setEditingCommentId(comment.id)}
                            className="w-10 h-10 p-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                          >
                            <Edit size={18} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => onDeleteComment(comment.id)}
                            className="w-10 h-10 p-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                          >
                            <Trash size={18} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => onToggleCompletion(comment.id)}
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
