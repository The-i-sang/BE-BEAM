import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div className="w-full pt-40 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-3/8">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-3/8 bg-red-500">
          <p>{toolkit.title}</p>
        </div>
      </div>
    </div>
  );
}
