import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return <div>Detail Page</div>;
}
