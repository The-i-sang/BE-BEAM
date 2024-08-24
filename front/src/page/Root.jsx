import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  CommunityReviewSlidesToShowState,
  SlidesToShowState,
} from "../recoil/contentState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const StyledToastContainer = styled(ToastContainer).attrs({})`
  @media (max-width: 768px) {
    width: 90% !important;
    max-width: none !important;
    transform: translateX(-50%) !important;
    left: 50% !important;
    bottom: 1em !important;
  }

  .Toastify__toast--default {
    background-color: #100e10 !important;
    color: white !important;
    font-size: 14px !important;
  }

  .Toastify__close-button {
    color: white !important;
    opacity: 0.8 !important;
  }

  .Toastify__progress-bar {
    background: #d93c30 !important;
  }
`;

export default function Root() {
  const queryClient = new QueryClient();
  const contentWrapRef = useRef(null);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const setSlidesToShow = useSetRecoilState(SlidesToShowState);
  const setCommunityReviewSlidesToShow = useSetRecoilState(
    CommunityReviewSlidesToShowState
  );

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1280) {
        setSlidesToShow(2);
        setCommunityReviewSlidesToShow(5);
      } else if (width > 1024 && width < 1280) {
        setSlidesToShow(2);
        setCommunityReviewSlidesToShow(4);
      } else if (width < 1024 && width > 768) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(3);
      } else if (width < 768 && width > 640) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(2);
      } else if (width < 640) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setSlidesToShow, setCommunityReviewSlidesToShow]);

  return (
    <div
      ref={contentWrapRef}
      className={`${
        sideBarOpen ? "h-[100vh] overflow-hidden" : "h-auto"
      } font-medium tracking-tighter whitespace-pre-wrap leading-normal list-none dark:bg-bg-dark-default dark:text-text-dark-default`}
    >
      <ScrollRestoration />
      <Navbar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <StyledToastContainer />
      </QueryClientProvider>
      <Footer />

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
