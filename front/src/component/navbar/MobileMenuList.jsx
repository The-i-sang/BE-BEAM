import MobileMenu from "./MobileMenu";
import { AppPage } from "../../common2";

import { GoX } from "react-icons/go";

export default function MobileMenuList({ setSideBarOpen, sideBarOpen }) {
  return (
    <ul
      className={`${
        sideBarOpen ? "w-full" : "w-0"
      } h-full block sm:hidden fixed top-0 left-0 z-[999] py-5 bg-gradient-to-r dark:from-[#1c1b1b] dark:to-black from-[#f5aa15] to-[#ff9100] box-border transition-all duration-700 overflow-hidden`}
    >
      <div className={`${sideBarOpen ? "block" : "hidden"} w-full h-full`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSideBarOpen(false);
          }}
          className="mx-[1rem] text-[1.4rem] dark:text-[#f5aa15] text-white mt-[30px] transition-all duration-700"
        >
          <GoX />
        </button>

        <ul className="w-full h-full mx-[1.3rem] mt-[-30px] dark:text-[#f5aa15] text-white text-[1.6rem] flex flex-col justify-center gap-y-10">
          <MobileMenu
            path={AppPage.home}
            title="Brand"
            setSideBarOpen={setSideBarOpen}
          />
          <MobileMenu
            path={AppPage.toolkit}
            title="Toolkit"
            setSideBarOpen={setSideBarOpen}
          />
          <MobileMenu
            path={AppPage.meeting}
            title="Meeting"
            setSideBarOpen={setSideBarOpen}
          />
        </ul>
      </div>
    </ul>
  );
}
