"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Logo from "@/app/components/Icons/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="fixed top-10 left-40 flex flex-col items-center">
      <Button
        onClick={handleClick}
        className={`w-16 h-16 bg-gradient-to-b from-red-500 via-red-700 to-red-750 rounded-full flex absolute items-center justify-center border-spacing-3 cursor-pointer  transition-all duration-500 ease-custom-ease group shadow-[0px_10px_20px_rgba(0,0,0,0.5),_0px_4px_6px_rgba(100,100,200,0.2)] hover:shadow-[0px_8px_20px_rgba(0,0,0,1)] hover:scale-105 hover:w-[200px]  hover:px-6 ${
          session
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-white hover:bg-gray-100 text-black"
        }`}
        style={{ width: "60px", height: "60px" }}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6 text-white" />
        </div>
        <Logo className=" fill-red-400" />
      </Button>

      {/* Beschriftung */}
    </div>
  );
};

export default FloatingButton;
