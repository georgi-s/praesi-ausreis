"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Logo from "@/app/components/Icons/Logo";

const FloatingButton: React.FC = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn("github");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center">
      <Button
        onClick={handleClick}
        className={`p-4 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300  transform hover:scale-105 all 0.3s ease-in-out ${
          session
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-white hover:bg-gray-100 text-black"
        }`}
        style={{ width: "60px", height: "60px" }}
      >
        <Logo className=" fill-red-400" />
      </Button>

      {/* Beschriftung */}
      <p className="mt-2 text-sm text-center text-gray-600">
        {session ? "Klicken zum Abmelden" : "Klicken zum Anmelden mit GitHub"}
      </p>
    </div>
  );
};

export default FloatingButton;
