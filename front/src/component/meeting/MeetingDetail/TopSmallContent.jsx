export default function TopSmallContent({
  icon,
  title,
  mdStyle,
  smStyle,
  basicStyle,
}) {
  return (
    <li
      className={`${mdStyle} ${smStyle} ${basicStyle} md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:p-0 py-4 border-box border-solid border-[#DADCE0] flex items-center gap-x-4 sm:text-[1.8rem] text-[1.4rem]`}
    >
      <p className="lg:w-auto md:w-[20%]">{icon}</p>
      <p className="lg:w-auto md:w-[80%] text-[1rem]">{title}</p>
    </li>
  );
}
