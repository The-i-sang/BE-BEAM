import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ActivityDetail({ setCategoryOn }) {
  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  useEffect(() => {
    setCategoryOn(false);
  }, []);
  return (
    <div className="w-full h-[720px] py- bg-orange-600 relative">
      <div>
        <img
          className="w-full h-full object-cover object-center absolute top-0 left-0 z-[0]"
          src={process.env.PUBLIC_URL + `/../${activity.thumbnail}`}
          alt="img"
        />
      </div>
    </div>
  );
}
