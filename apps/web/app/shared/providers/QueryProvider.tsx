"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { makeQueryClient } from "../lib/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "bg-white dark:bg-gray-800",
            title: "text-gray-900 dark:text-gray-100",
            description: "text-gray-600 dark:text-gray-400",
          },
        }}
      />
    </QueryClientProvider>
  );
}
