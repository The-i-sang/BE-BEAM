import React, { useContext } from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoryProvider } from "../context/CategoryContext";
import Category from "../component/Category";
import { CategoryContext } from "../context/CategoryContext";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <div>
      <CategoryProvider>
        <Category />
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <Footer />
      </CategoryProvider>
    </div>
  );
}
