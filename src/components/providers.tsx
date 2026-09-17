"use client";
import React from "react";
import { queryClient } from "@/constants/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/context/lenis";

// TODO: remove one of the toasters if there are conflicts

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <LenisProvider>
              <div>{children}</div>
            </LenisProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
      <Toaster />
      <SonnerToaster />
    </>
  );
};

export default Providers;
