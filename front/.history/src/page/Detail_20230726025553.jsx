import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div className="w-full py-40 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-5/12">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-5/12">
          <p>{toolkit.type}</p>
          <p>{toolkit.title}</p>
          <p>{toolkit.description}</p>

          <div>
            <div>
              <p>다음과 같은 분들에게 유용해요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
