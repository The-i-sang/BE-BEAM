export default function CategoryMenu({
  icon,
  title,
  value,
  topic,
  filter,
  setFilter,
}) {
  const categoryBoolean = filter[topic] === value;

  return (
    <button
      type="button"
      className={`${
        categoryBoolean
          ? "bg-bg-light-default dark:bg-bg-dark-70 text-text-light-90 dark:text-text-dark-default"
          : "bg-transparent dark:text-text-dark-10"
      } lg:w-[100px] lg:h-[100px] sm:w-[90px] sm:h-[90px] w-[90px] h-[90px] aspect-square border-[2px] border-solid border-white rounded-xl flex flex-col items-center justify-center hover:bg-bg-light-default hover:dark:bg-bg-dark-70 hover:text-text-light-90 hover:dark:text-text-dark-default transition-all duration-700 xl:text-[1rem] lg:text-[1rem] sm:text-[0.9rem] text-[0.9rem]`}
      onClick={() => {
        setFilter((prev) => ({ ...prev, [topic]: value }));
      }}
    >
      <img className="w-[70%] aspect-square" src={icon} alt="icon" />
      <p className="font-semibold leading-tight">{title}</p>
    </button>
  );
}
