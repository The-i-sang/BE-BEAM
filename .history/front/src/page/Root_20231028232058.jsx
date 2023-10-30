import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <div className="font-sans font-medium tracking-tighter whitespace-pre-wrap leading-7 overflow-scroll scrollbar-hide">
      <ScrollRestoration />
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
