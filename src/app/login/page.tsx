"use client";

import React from "react";
import { LoginButton } from "@/components/auth/LoginButton";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="relative">
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
