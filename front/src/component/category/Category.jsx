import React from "react";
import { motion } from "framer-motion";
import CategoryMenu from "./CategoryMenu";

export default function Category({ title, iconImg, arr }) {
  return (
    <div className="w-full px-4 py-2 box-border bg-black text-white">
      <div className="w-full flex flex-row items-center">
        <motion.div
          initial={{ scale: 2 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 60,
            repeat: Infinity,
          }}
        >
          <img className="w-[100px] aspect-square" src={iconImg} alt="icon" />
        </motion.div>
        <p className="md:ml-[-30px] ml-[-30px] font-semibold 2xl:text-[2.3rem] xl:text-[2rem] lg:text-[1.8rem] sm:text-[2rem] text-[1.8rem]">
          {title}
        </p>
      </div>

      <ul className="w-full mt-[-12px] flex flex-row items-center gap-x-4 overflow-x-scroll overflow-y-hidden">
        {arr?.map((type) => (
          <CategoryMenu icon={type.icon} title={type.title} />
        ))}
      </ul>
    </div>
  );
}
