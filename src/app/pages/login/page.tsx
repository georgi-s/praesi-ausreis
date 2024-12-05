"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Github, GithubIcon, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Logo from "@/app/components/Icons/Logo";

const LoginPage: React.FC = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn("github");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="relativ">
        <div
          className={`w-16 h-16 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-750 rounded-full flex absolute items-center justify-center border-spacing-3 cursor-pointer  transition-all duration-500 ease-custom-ease group shadow-[0px_10px_20px_rgba(0,0,0,0.5),_0px_4px_6px_rgba(100,100,200,0.2)] hover:shadow-[0px_8px_20px_rgba(0,0,0,1)] hover:scale-105 hover:w-[200px]  hover:px-6${
            session ? "bg-red-500 hover:bg-red-600" : "hover:bg-[#1a1e21]"
          }`}
          onClick={handleClick}
        >
          {session ? (
            <>
              <LogOut className="w-6 h-6 fill-red-500 text-white transition-all duration-500 ease-custom-ease group-hover:mr-3" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-custom-ease text-white font-medium text-lg">
                Abmelden
              </span>
            </>
          ) : (
            <>
              <Logo className="w-6 h-6 fill-current text-white transition-all duration-500 ease-custom-ease group-hover:mr-3" />
              <span className="opacity-0 overflow-hidden text-wrap group-hover:opacity-100 delay-150 transition-all duration-500 ease-custom-ease text-white font-medium text-lg">
                Anmelden
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
