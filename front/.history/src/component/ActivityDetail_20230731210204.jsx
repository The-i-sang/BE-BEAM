import React, { useEffect } from "react";

export default function ActivityDetail({ setCategoryOn, activity }) {
  useEffect(() => {
    setCategoryOn(false);
  }, []);
  return (
    <div className="w-full min-h-[800px]">
      <div>
        <img src={process.env.PUBLIC_URL + `${activity.image}`} alt="img" />
      </div>
    </div>
  );
}
