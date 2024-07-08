import Menu from "./Menu";
import { AppPage } from "../../common2";

export default function MenuList() {
  return (
    <ul className="lg:w-[50%] sm:w-[58%] hidden sm:flex justify-between text-[#344054] dark:text-white lg:text-[1.25rem] md:text-[1.16rem] sm:text-[1.1rem] text-[1.1rem]">
      <Menu path={AppPage.home} title="Meeting" />
      <Menu path={AppPage.toolkit} title="Toolkit" />
      <Menu path={AppPage.brand} title="Brand" />
    </ul>
  );
}
