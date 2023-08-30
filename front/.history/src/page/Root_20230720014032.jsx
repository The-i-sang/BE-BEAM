import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <div>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
