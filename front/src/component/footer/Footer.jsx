export default function Footer() {
  return (
    <div className="w-full bg-bg-light-default dark:bg-bg-dark-default border-t-[1px] border-solid border-mainColor text-mainColor">
      <div className="w-11/12 max-w-[90%] mx-auto py-10 box-border flex sm:flex-row flex-col items-center">
        <img
          className="md:w-[80px] sm:w-[70px] w-[60px] h-full object-cover"
          src={"/logo/logo2.png"}
          alt="logo"
        />
        <p className="w-11/12 sm:mt-0 mt-4 lg:text-[1.25rem] md:text-[1.16rem] sm:text-[1.1rem] text-[1rem] text-center">
          Copyright ⓒ 2023 beBeam. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
