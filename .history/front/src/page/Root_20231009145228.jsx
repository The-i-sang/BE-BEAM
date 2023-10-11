import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "../component/Category";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <div>
      <ScrollRestoration />
      {Category && <Category />}
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
