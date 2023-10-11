import React from "react";
import Navbar from "../component/Navbar";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const queryClient = new QueryClient();

  const params = useParams();
  console.log(params);

  const location = useLocation();
  console.log(location);

  return (
    <div className="font-sans font-medium">
      <ScrollRestoration />
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}
