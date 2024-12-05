"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginPage from "@/app/pages/login/page";
import HomePage from "@/app/pages/home/page";
import { Loader2 } from "lucide-react";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <>
      {!session && <LoginPage />}
      {session && <HomePage />}
    </>
  );
}
