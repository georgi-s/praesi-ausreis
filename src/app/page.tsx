// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import ParallaxPresentation from "@/app/components/ParallaxPresentation";
// import FloatingButton from "./components/FloatingButton";
// // import { CommentDialog } from "./components/CommentDialog";
// import CommentSidebar from "./components/CommentSidebar";
// import { Comment, CommentData } from "@/types/comment";
// import {
//   fetchComments,
//   addComment,
//   updateComment,
//   deleteComment,
//   toggleCommentCompletion,
// } from "@/app/lib/api/commentClient";

// export default function Home() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [comments, setComments] = useState<CommentData[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     const loadComments = async () => {
//       const fetchedComments = await fetchComments();
//       setComments(fetchedComments);
//     };
//     loadComments();
//   }, []);

//   const handleOpenDialog = () => setIsDialogOpen(true);
//   const handleCloseDialog = () => setIsDialogOpen(false);

//   const handleAddComment = async (content: string) => {
//     if (session?.user) {
//       const newComment = await addComment(content, 0, 0, currentSlide);
//       if (newComment) {
//         setComments((prevComments) => [...prevComments, newComment]);
//       }
//     } else {
//       console.log("Benutzer ist nicht eingeloggt");
//     }
//   };

//   const handleUpdateComment = async (id: string, content: string) => {
//     const updatedComment = await updateComment(id, content, 0, 0);
//     if (updatedComment) {
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === id
//             ? { ...comment, content: updatedComment.content }
//             : comment
//         )
//       );
//     }
//   };

//   const handleDeleteComment = async (id: string) => {
//     const success = await deleteComment(id);
//     if (success) {
//       setComments((prevComments) =>
//         prevComments.filter((comment) => comment.id !== id)
//       );
//     }
//   };

//   const handleToggleCompletion = async (id: string) => {
//     const updatedComment = await toggleCommentCompletion(id);
//     if (updatedComment) {
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === id
//             ? { ...comment, isCompleted: updatedComment.isCompleted }
//             : comment
//         )
//       );
//     }
//   };

//   const handleSlideChange = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const user = session?.user || {
//     name: "Gast",
//     image: "https://via.placeholder.com/40",
//   };

//   return (
//     <main className="relative min-h-screen">
//       <ParallaxPresentation onSlideChange={handleSlideChange} />
//       <FloatingButton />
//       <CommentSidebar
//         currentSlide={currentSlide}
//         comments={comments}
//         onAddComment={handleAddComment}
//         onUpdateComment={handleUpdateComment}
//         onDeleteComment={handleDeleteComment}
//         onToggleCompletion={handleToggleCompletion}
//         userAvatar={user.image || ""}
//         userName={user.name || ""}
//       />
//     </main>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ParallaxPresentation from "@/app/components/ParallaxPresentation";
import FloatingButton from "./components/FloatingButton";
import CommentSidebar from "./components/CommentSidebar";
import { Comment, CommentData } from "@/types/comment";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
  toggleCommentCompletion,
} from "@/app/lib/api/commentClient";
import io from "socket.io-client";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3000",
      {
        path: "/api/socketio",
      }
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const fetchedComments = await fetchComments();
    setComments(fetchedComments);
  };
  useEffect(() => {
    if (socket) {
      socket.on("new-comment", (newComment: Comment) => {
        setComments((prevComments) => [...prevComments, newComment]);
      });

      socket.on("update-comment", (updatedComment: Comment) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
          )
        );
      });

      socket.on("delete-comment", (deletedCommentId: string) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== deletedCommentId)
        );
      });

      socket.on("toggle-completion", (toggledComment: Comment) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === toggledComment.id
              ? { ...comment, isCompleted: toggledComment.isCompleted }
              : comment
          )
        );
      });
    }
  }, [socket]);

  const handleAddComment = async (content: string) => {
    if (session?.user) {
      const newComment = await addComment(content, 0, 0, currentSlide);
      if (newComment) {
        loadComments();
        socket?.emit("new-comment", newComment);
      }
    } else {
      console.log("Benutzer ist nicht eingeloggt");
    }
  };

  const handleUpdateComment = async (id: string, content: string) => {
    const updatedComment = await updateComment(id, content, 0, 0);
    if (updatedComment) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, content: updatedComment.content }
            : comment
        )
      );
      socket?.emit("update-comment", updatedComment);
    }
  };

  const handleDeleteComment = async (id: string) => {
    const success = await deleteComment(id);
    if (success) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
      socket?.emit("delete-comment", id);
    }
  };

  const handleToggleCompletion = async (id: string) => {
    const updatedComment = await toggleCommentCompletion(id);
    if (updatedComment) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, isCompleted: updatedComment.isCompleted }
            : comment
        )
      );
      socket?.emit("toggle-completion", updatedComment);
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const user = session?.user || {
    name: "Gast",
    image: "https://via.placeholder.com/40",
  };

  return (
    <main className="relative min-h-screen">
      <ParallaxPresentation onSlideChange={handleSlideChange} />
      <FloatingButton />

      <CommentSidebar
        currentSlide={currentSlide}
        comments={comments}
        onAddComment={handleAddComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
        onToggleCompletion={handleToggleCompletion}
        userAvatar={user.image || ""}
        userName={user.name || ""}
      />
    </main>
  );
}
