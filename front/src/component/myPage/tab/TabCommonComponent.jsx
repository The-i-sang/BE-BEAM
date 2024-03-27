import Tabs from "./Tabs";

export default function TabCommonComponent({ title }) {
  return (
    <div className="w-full mt-14 overflow-hidden">
      <p className="text-[1.125rem] font-semibold dark:text-white">{title}</p>

      <div className="w-full mt-5 bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex items-center gap-x-2 overflow-hidden">
        <Tabs title={title} />
      </div>
    </div>
  );
}
