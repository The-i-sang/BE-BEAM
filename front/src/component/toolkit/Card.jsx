export default function Card({ data, onClick, thumbnailImg, bgColor }) {
  return (
    <li
      onClick={onClick}
      className={`${bgColor} w-full mb-5 sm:p-5 p-3 box-border dark:bg-bg-dark-80 rounded-md text-white group transition-all duration-700 shadow-[0_5px_5px_2px_#ebebeb] dark:shadow-none text-left sm:text-[1.1rem] text-[1rem]`}
    >
      <div className="relative w-full overflow-hidden rounded-md">
        <div className="w-full aspect-square bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 z-[99] opacity-0 group-hover:opacity-100 transition-all duration-700" />

        <button
          className={`${bgColor} dark:bg-bg-dark-80 w-[80px] aspect-square px-1 box-border rounded-full opacity-0 group-hover:opacity-100 hover:[transform:rotateY(360deg)] z-[999] absolute top-[50%] mt-[-40px] left-[50%] ml-[-40px] transition-all duration-700`}
        >
          View ↗
        </button>

        <img
          className="object-cover w-full aspect-square"
          src={process.env.PUBLIC_URL + thumbnailImg.replace("./", "/")}
          alt={data.alt}
        />
      </div>

      <div className="w-full mt-4">
        <p className="xl:text-[1.6rem] sm:text-[1.5rem] text-[1.4rem] font-bold xl:line-clamp-2 lg:line-clamp-1">
          {data.title}
        </p>
        <p className="mt-3 mb-6 font-normal whitespace-normal sm:mt-6 lg:mb-0 sm:mb-4">
          {data.description}
        </p>
      </div>
    </li>
  );
}
