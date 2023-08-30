import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";

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
