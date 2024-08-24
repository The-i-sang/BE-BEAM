export default function PrevArrow({ onClick, toolkitType, icon }) {
  return (
    <>
      <div
        onClick={onClick}
        className={`${
          !toolkitType
            ? "left-2 text-text-light-10 top-[40%]"
            : "left-0 text-text-light-90 top-[46%]"
        } text-[2.4rem] dark:text-text-dark-default absolute z-[9999] cursor-pointer`}
      >
        {icon}
      </div>
    </>
  );
}
