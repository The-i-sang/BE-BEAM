import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const queryClient = new QueryClient();
  const contentWrapRef = useRef(null);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const scrollToTop = () => {
    // ref가 가리키는 요소의 높이를 이용하여 스크롤
    window.scrollTo({
      top: contentWrapRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  function onScroll() {
    setContentHeight(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={contentWrapRef}
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

      {/* TOP 버튼 */}
      <button
        onClick={scrollToTop}
        className={`${
          contentHeight < 100 ? "opacity-0 z-[-9]" : "opacity-100"
        } w-[3.75rem] h-[3.75rem] bg-white dark:bg-[rgba(255,255,255,0.3)] rounded-xl border-[1px] border-solid border-[#ccc] drop-shadow-md fixed bottom-5 right-5 text-[0.875rem] text-[#6d6d6d] dark:text-white transition-all duration-1000`}
      >
        TOP
      </button>
    </div>
  );
}
