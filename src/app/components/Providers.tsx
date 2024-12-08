"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="parallax-theme">
        <SessionProvider>
          <AuthProvider>
            <ToastProvider position="bottom-right">
              <PageTransition>
                {children}
              </PageTransition>
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
