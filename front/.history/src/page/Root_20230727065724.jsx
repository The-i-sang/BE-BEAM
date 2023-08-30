import React, { useContext, useState } from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "../component/Category";

export default function Root() {
  const queryClient = new QueryClient();

  const [categoryOn, setCategoryOn] = useState(false);

  return (
    <div>
      {Category && (
        <Category categoryOn={categoryOn} setCategoryOn={setCategoryOn} />
      )}
      <Navbar setCategoryOn={setCategoryOn} />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
