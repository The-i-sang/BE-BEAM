export default function SubTitle({ title, des, des2 }) {
  return (
    <div className="sm:text-[1rem] text-[0.875rem]">
      <h1 className="sm:text-[1.5rem] text-[1.2rem] text-text-light-90 dark:text-text-light-10 font-semibold">
        {title}
      </h1>

      <div className="mt-1 font-medium sm:mt-2 text-text-light-60 dark:text-text-dark-10">
        <p>{des}</p>
        <p>{des2}</p>
      </div>
    </div>
  );
}
