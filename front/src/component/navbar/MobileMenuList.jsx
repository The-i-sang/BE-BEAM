import MobileMenu from "./MobileMenu";
import { AppPage } from "../../common2";

import { GoX } from "react-icons/go";

export default function MobileMenuList({ setSideBarOpen, sideBarOpen }) {
  return (
    <ul
      className={`${
        sideBarOpen ? "w-full" : "w-0"
      } h-full block sm:hidden fixed top-0 left-0 z-[999] py-5 bg-gradient-to-r dark:from-bg-dark-90 dark:to-bg-dark-default from-mainColor to-subColor box-border transition-all duration-700 overflow-hidden text-text-light-10 dark:text-mainColor`}
    >
      <div
        className={`${
          sideBarOpen ? "block" : "hidden"
        } w-full h-full text-[1.6rem]`}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setSideBarOpen(false);
          }}
          className="mx-[1rem] text-[1.4rem] mt-[30px] transition-all duration-700"
        >
          <GoX />
        </button>

        <ul className="w-full h-full mx-[1.3rem] mt-[-30px] flex flex-col justify-center gap-y-10">
          <MobileMenu
            path={AppPage.home}
            title="Meeting"
            setSideBarOpen={setSideBarOpen}
          />
          <MobileMenu
            path={AppPage.communityReviews}
            title="Community-Reviews"
            setSideBarOpen={setSideBarOpen}
          />
          <MobileMenu
            path={AppPage.toolkit}
            title="Toolkit"
            setSideBarOpen={setSideBarOpen}
          />
          <MobileMenu
            path={AppPage.brand}
            title="Brand"
            setSideBarOpen={setSideBarOpen}
          />
        </ul>
      </div>
    </ul>
  );
}
