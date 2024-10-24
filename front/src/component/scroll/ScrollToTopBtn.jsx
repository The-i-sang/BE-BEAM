import { forwardRef } from "react";

const ScrollToTopBtn = forwardRef(({ contentHeight }, ref) => {
  const scrollToTop = () => {
    // ref가 가리키는 요소의 높이를 이용하여 스크롤
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        contentHeight < 100 ? "opacity-0 z-[-9]" : "opacity-100"
      } w-[3.75rem] h-[3.75rem] bg-white dark:bg-[rgba(255,255,255,0.3)] rounded-xl border-[1px] border-solid border-[#ccc] drop-shadow-md fixed bottom-5 right-5 text-[0.875rem] text-[#6d6d6d] dark:text-white transition-all duration-1000`}
    >
      TOP
    </button>
  );
});

export default ScrollToTopBtn;
