import React from "react";
import { useNavigate } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return <li className="w-full p-4 box-border bg-white rounded-xl"></li>;
}
