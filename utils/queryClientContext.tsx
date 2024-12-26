"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function QueryClientContext({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}><Toaster position="top-right"/>{children}</QueryClientProvider>
  );
}
