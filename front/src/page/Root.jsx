import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const queryClient = new QueryClient();

  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div
      className={`${
        sideBarOpen ? "h-[100vh] overflow-hidden" : "h-auto"
      } font-sans font-medium tracking-tighter whitespace-pre-wrap leading-normal`}
    >
      <ScrollRestoration />
      <Navbar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
