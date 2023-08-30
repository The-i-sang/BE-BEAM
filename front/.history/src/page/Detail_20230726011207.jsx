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
      <div className="w-11/12 mx-auto py-10">
        {toolkit && toolkit.map((t) => <DetailSlider t={t} />)}
        <p>{toolkit.title}</p>
      </div>
    </div>
  );
}
