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
    <div className="w-full min-h-[800px]">
      <div>
        <img
          src={process.env.PUBLIC_URL + `/../${activity.thumbnail}`}
          alt="img"
        />
      </div>
    </div>
  );
}
