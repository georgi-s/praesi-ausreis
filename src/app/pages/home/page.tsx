"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ParallaxPresentation from "@/app/components/ParallaxPresentation";
import FloatingButton from "@/app/components/FloatingButton";
import CommentSidebar from "@/app/components/CommentSidebar";
import { Comment } from "@/types/comment";
import useSWR from "swr";
import { fetchComments } from "@/app/lib/api/commentClient";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: session, status } = useSession();

  const { data: comments = [], mutate } = useSWR<Comment[]>(
    status === "authenticated" ? "/api/comments" : null,
    fetchComments,
    {
      refreshInterval: 1000,
    }
  );

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const user = session?.user || {
    name: "Gast",
    image: "https://via.placeholder.com/40",
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <ParallaxPresentation onSlideChange={handleSlideChange} />
      <FloatingButton />
      {status === "authenticated" && (
        <CommentSidebar
          currentSlide={currentSlide}
          comments={comments}
          mutateComments={mutate}
          userAvatar={user.image || ""}
          userName={user.name || ""}
        />
      )}
    </main>
  );
}
