// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   MessageCircle,
//   Edit,
//   Trash,
//   Check,
// } from "lucide-react";
// import { Comment, CommentData } from "@/types/comment";
// import CommentForm from "./CommentForm";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";

// interface CommentSidebarProps {
//   currentSlide: number;
//   comments: CommentData[];
//   onAddComment: (content: string) => Promise<void>;
//   onUpdateComment: (id: string, content: string) => Promise<void>;
//   onDeleteComment: (id: string) => Promise<void>;
//   onToggleCompletion: (id: string) => Promise<void>;
//   userAvatar: string;
//   userName: string;
// }

// const CommentSidebar: React.FC<CommentSidebarProps> = ({
//   currentSlide,
//   comments,
//   onAddComment,
//   onUpdateComment,
//   onDeleteComment,
//   onToggleCompletion,
//   userAvatar,
//   userName,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isFullyOpen, setIsFullyOpen] = useState(false);
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
//   const [editContent, setEditContent] = useState("");
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     audioRef.current = new Audio("/mixkit-software-interface-back-2575.wav");
//   }, []);

//   const handleToggle = () => {
//     if (isOpen) {
//       setIsFullyOpen(false);
//       setTimeout(() => setIsOpen(false), 500);
//     } else {
//       setIsOpen(true);
//       setTimeout(() => setIsFullyOpen(true), 500);
//     }
//   };

//   const filteredComments = comments.filter(
//     (comment) => comment.slideIndex === currentSlide
//   );

//   const handleEditComment = (id: string, content: string) => {
//     setEditingCommentId(id);
//     setEditContent(content);
//   };

//   const handleUpdateComment = async (id: string) => {
//     await onUpdateComment(id, editContent);
//     setEditingCommentId(null);
//     setEditContent("");
//   };

//   const handleAddComment = async (content: string) => {
//     await onAddComment(content);
//     playNotificationSound();
//   };

//   const playNotificationSound = () => {
//     if (audioRef.current) {
//       audioRef.current
//         .play()
//         .catch((error) => console.error("Error playing audio:", error));
//     }
//   };

//   return (
//     <motion.div
//       className="fixed right-0 top-0 h-full flex items-stretch"
//       initial={{ x: "calc(100% - 40px)" }}
//       animate={{ x: isOpen ? 0 : "calc(100% - 40px)" }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//     >
//       <motion.div
//         className="bg-blue-500 text-white cursor-pointer z-50 flex flex-col items-center justify-between rounded-l-[0.5rem] overflow-hidden"
//         initial={{ width: "40px", height: "120px" }}
//         animate={{
//           width: "40px",
//           height: isFullyOpen ? "100%" : "120px",
//         }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         <button
//           onClick={handleToggle}
//           className="w-full p-2 flex items-center justify-center"
//         >
//           {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
//         </button>
//         <AnimatePresence>
//           {isFullyOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex-grow flex flex-col justify-center items-center"
//             >
//               <span className="writing-vertical text-sm font-medium"></span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <div className="p-2 flex flex-col items-center">
//           <MessageCircle size={24} />
//           <span className="text-sm font-bold">{filteredComments.length}</span>
//         </div>
//       </motion.div>

//       <motion.div
//         className="bg-white shadow-lg flex flex-col overflow-hidden"
//         initial={{ width: 0, height: "120px" }}
//         animate={{
//           width: isOpen ? "320px" : 0,
//           height: isFullyOpen ? "100%" : "120px",
//         }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         <AnimatePresence>
//           {isFullyOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="flex-grow flex flex-col w-full"
//             >
//               <div className="p-4">
//                 <h2 className="text-2xl font-bold mb-4">Kommentare</h2>
//                 <CommentForm
//                   onSubmit={handleAddComment}
//                   userAvatar={userAvatar}
//                   userName={userName}
//                 />
//               </div>
//               <Separator />
//               <ScrollArea className="flex-grow">
//                 <div className="p-4">
//                   {filteredComments.length === 0 ? (
//                     <p className="text-gray-500">
//                       Keine Kommentare für diese Folie.
//                     </p>
//                   ) : (
//                     filteredComments.map((comment) => (
//                       <div
//                         key={comment.id}
//                         className={`bg-gray-100 rounded-lg p-4 mb-4 ${
//                           comment.isCompleted ? "opacity-50" : ""
//                         }`}
//                       >
//                         <div className="flex items-center mb-2">
//                           {comment.user.avatar ? (
//                             <img
//                               src={comment.user.avatar}
//                               alt={comment.user.name}
//                               className="w-8 h-8 rounded-full mr-2"
//                               onError={(e) => {
//                                 e.currentTarget.src =
//                                   "https://via.placeholder.com/32";
//                               }}
//                             />
//                           ) : (
//                             <div className="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
//                               {comment.user.name.charAt(0).toUpperCase()}
//                             </div>
//                           )}
//                           <span className="font-semibold">
//                             {comment.user.name}
//                           </span>
//                           <span className="text-gray-500 text-sm ml-auto">
//                             {new Date(comment.createdAt).toLocaleString()}
//                           </span>
//                         </div>
//                         {editingCommentId === comment.id ? (
//                           <div>
//                             <textarea
//                               value={editContent}
//                               onChange={(e) => setEditContent(e.target.value)}
//                               className="w-full p-2 border rounded"
//                             />
//                             <Button
//                               onClick={() => handleUpdateComment(comment.id)}
//                               className="mr-2"
//                             >
//                               Speichern
//                             </Button>
//                             <Button onClick={() => setEditingCommentId(null)}>
//                               Abbrechen
//                             </Button>
//                           </div>
//                         ) : (
//                           <p className="text-gray-700">{comment.content}</p>
//                         )}
//                         <div className="mt-2 flex justify-end space-x-2">
//                           <Button
//                             onClick={() =>
//                               handleEditComment(comment.id, comment.content)
//                             }
//                             className="w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center"
//                           >
//                             <Edit size={14} className="text-white" />
//                           </Button>
//                           <Button
//                             onClick={() => onDeleteComment(comment.id)}
//                             className="w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
//                           >
//                             <Trash size={14} className="text-white" />
//                           </Button>
//                           <Button
//                             onClick={() => onToggleCompletion(comment.id)}
//                             className={`w-8 h-8 p-0 rounded-full transition-colors flex items-center justify-center ${
//                               comment.isCompleted
//                                 ? "bg-green-500 hover:bg-green-600"
//                                 : "bg-gray-300 hover:bg-gray-400"
//                             }`}
//                           >
//                             <Check size={14} className="text-white" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </ScrollArea>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CommentSidebar;
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
import CommentForm from "./CommentForm";
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

  const handleEditComment = (id: string, content: string) => {
    setEditingCommentId(id);
    setEditContent(content);
  };

  const handleUpdateComment = async (id: string) => {
    await onUpdateComment(id, editContent);
    setEditingCommentId(null);
    setEditContent("");
    if (socketRef.current) {
      socketRef.current.emit("update-comment", { id, content: editContent });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (socketRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      socketRef.current.emit("cursor-move", { userId: userName, x, y });
    }
  };

  const handleAddComment = async (content: string) => {
    await onAddComment(content);
    if (socketRef.current) {
      socketRef.current.emit("new-comment", {
        content,
        slideIndex: currentSlide,
      });
    }
  };

  const handleDeleteComment = async (id: string) => {
    await onDeleteComment(id);
    if (socketRef.current) {
      socketRef.current.emit("delete-comment", id);
    }
  };

  const handleToggleCompletion = async (id: string) => {
    await onToggleCompletion(id);
    if (socketRef.current) {
      socketRef.current.emit("toggle-completion", { id });
    }
  };

  return (
    <motion.div
      className="fixed right-0 top-0 h-full flex items-stretch"
      initial={{ x: "calc(100% - 40px)" }}
      animate={{ x: isOpen ? 0 : "calc(100% - 40px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
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
        <AnimatePresence>
          {isFullyOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col justify-center items-center"
            >
              <span className="writing-vertical text-sm font-medium"></span>
            </motion.div>
          )}
        </AnimatePresence>
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
                <CommentForm
                  onSubmit={handleAddComment}
                  userAvatar={userAvatar}
                  userName={userName}
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
                    filteredComments.map((comment, index) => (
                      <div
                        key={comment.id + index}
                        className={`bg-gray-100 rounded-lg p-4 mb-4 ${
                          comment.isCompleted ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          {comment.user?.image ? (
                            <img
                              src={comment.user.image}
                              alt={comment.user.name || ""}
                              className="w-8 h-8 rounded-full mr-2"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/32";
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
                              {comment.user?.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-semibold">
                            {comment.user?.name}
                          </span>
                          <span className="text-gray-500 text-sm ml-auto">
                            {new Date(comment.createdAt).toLocaleString()}
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
                              onClick={() => handleUpdateComment(comment.id)}
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
                            onClick={() =>
                              handleEditComment(comment.id, comment.content)
                            }
                            className="w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <Edit size={14} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <Trash size={14} className="text-white" />
                          </Button>
                          <Button
                            onClick={() => handleToggleCompletion(comment.id)}
                            className={`w-8 h-8 p-0 rounded-full transition-colors flex items-center justify-center ${
                              comment.isCompleted
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                          >
                            <Check size={14} className="text-white" />
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

      {Object.entries(cursors).map(([userId, position]) => (
        <div
          key={userId}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "red",
            pointerEvents: "none",
          }}
        />
      ))}
    </motion.div>
  );
};

export default CommentSidebar;
