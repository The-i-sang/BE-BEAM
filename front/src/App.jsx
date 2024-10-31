import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccessTokenState,
  UserPersonalInfoState,
  userState,
} from "./recoil/userState";
import {
  CommunityReviewSlidesToShowState,
  DataUpdateState,
  ResponsiveSize,
  SlidesToShowState,
} from "./recoil/contentState";
import { changeCookieToToken, getUserPersonalInfo } from "./api/user";

import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import ScrollToTop from "./component/scroll/ScrollToTop";
import ScrollToTopBtn from "./component/scroll/ScrollToTopBtn";
import { StyledToastContainer } from "./StyledComponents";

function App() {
  const queryClient = new QueryClient();
  const contentWrapRef = useRef(null);

  const setUserIn = useSetRecoilState(userState);
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenState);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const setSlidesToShow = useSetRecoilState(SlidesToShowState);
  const setCommunityReviewSlidesToShow = useSetRecoilState(
    CommunityReviewSlidesToShowState
  );
  const setResponsiveSize = useSetRecoilState(ResponsiveSize);
  const setUserPersonalInfo = useSetRecoilState(UserPersonalInfoState);
  const meetingReviewDataQueryKeyPostFix = useRecoilValue(DataUpdateState);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken === "") {
        const token = await changeCookieToToken();
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
      }
    };

    fetchData();
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (accessToken !== "") {
      setUserIn(true);
    }
  }, [accessToken, setUserIn]);

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
      if (width >= 1536) {
        setSlidesToShow(2);
        setCommunityReviewSlidesToShow(5);
        setResponsiveSize("2xl");
      } else if (width >= 1280 && width < 1536) {
        setSlidesToShow(2);
        setCommunityReviewSlidesToShow(5);
        setResponsiveSize("xl");
      } else if (width >= 1024 && width < 1280) {
        setSlidesToShow(2);
        setCommunityReviewSlidesToShow(4);
        setResponsiveSize("lg");
      } else if (width < 1024 && width >= 768) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(3);
        setResponsiveSize("md");
      } else if (width < 768 && width >= 640) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(2);
        setResponsiveSize("sm");
      } else if (width < 640 && width >= 500) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(1);
        setResponsiveSize("2sm");
      } else if (width < 500) {
        setSlidesToShow(1);
        setCommunityReviewSlidesToShow(1);
        setResponsiveSize("3sm");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setSlidesToShow, setCommunityReviewSlidesToShow, setResponsiveSize]);

  useEffect(() => {
    const fetchUserPersonalInfo = async () => {
      if (accessToken) {
        const userPersonalInfo = await getUserPersonalInfo(accessToken);
        setUserPersonalInfo(userPersonalInfo);
      }
    };
    fetchUserPersonalInfo();
  }, [accessToken, setUserPersonalInfo, meetingReviewDataQueryKeyPostFix]);

  return (
    <div
      ref={contentWrapRef}
      className={`${
        sideBarOpen ? "h-[100vh] overflow-hidden" : "h-auto"
      } font-medium tracking-tighter whitespace-pre-wrap leading-normal list-none dark:bg-bg-dark-default dark:text-text-dark-default`}
    >
      <QueryClientProvider client={queryClient}>
        <Navbar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
        <Outlet />
        <Footer />
      </QueryClientProvider>

      <ScrollToTop />
      <StyledToastContainer />
      <ScrollToTopBtn ref={contentWrapRef} contentHeight={contentHeight} />
    </div>
  );
}

export default App;
