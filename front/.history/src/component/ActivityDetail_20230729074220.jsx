import React, { useEffect } from "react";

export default function ActivityDetail({ setCategoryOn }) {
  useEffect(() => {
    setCategoryOn(false);
  }, []);
  return <div></div>;
}
