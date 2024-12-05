"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ParallaxPresentation from "@/app/components/ParallaxPresentation";
import FloatingButton from "./components/FloatingButton";
import CommentSidebar from "./components/CommentSidebar";
import { Comment } from "@/types/comment";
import useSWR from "swr";
import { fetchComments } from "@/app/lib/api/commentClient";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: session } = useSession();

  const { data: comments = [], mutate } = useSWR<Comment[]>(
    "/api/comments",
    fetchComments,
    {
      refreshInterval: 1000, // Poll every second for updates
    }
  );

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
        mutateComments={mutate}
        userAvatar={user.image || ""}
        userName={user.name || ""}
      />
    </main>
  );
}
