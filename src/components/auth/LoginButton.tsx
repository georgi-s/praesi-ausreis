"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/Toast";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession, SignOutResponse } from "next-auth/react";
import { useState } from "react";

export function LoginButton() {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!session?.user;

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        const result = await signOut({ redirect: false });
        showToast("Erfolgreich abgemeldet", { type: "success" });
      } else {
        const result = (await signIn(undefined, {
          redirect: false,
        })) as unknown as { error?: string };
        if (result?.error) {
          showToast(result.error || "Fehler beim Anmelden", { type: "error" });
        } else {
          showToast("Erfolgreich angemeldet", { type: "success" });
        }
      }
    } catch (error) {
      showToast("Ein unerwarteter Fehler ist aufgetreten", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAuth}
      variant={isAuthenticated ? "destructive" : "default"}
      className={`
        group
        w-16 h-16 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-750 
        rounded-full flex absolute items-center justify-center
        transition-all duration-500 ease-custom-ease
        shadow-login-default hover:shadow-login-hover
        hover:scale-105 hover:w-[200px] hover:px-6
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      size="default"
      isLoading={isLoading}
      loadingText={isAuthenticated ? "Abmelden..." : "Anmelden..."}
      leftIcon={isAuthenticated ? <LogOut /> : <LogIn />}
    >
      {isAuthenticated ? "Abmelden" : "Anmelden"}
    </Button>
  );
}
