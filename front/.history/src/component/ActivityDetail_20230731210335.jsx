import React, { useEffect } from "react";

export default function ActivityDetail({ setCategoryOn }) {
  useEffect(() => {
    setCategoryOn(false);
  }, []);
  return (
    <div className="w-full min-h-[800px]">
      <div>
        <img src={process.env.PUBLIC_URL + `${activity.thumbnail}`} alt="img" />
      </div>
    </div>
  );
}
