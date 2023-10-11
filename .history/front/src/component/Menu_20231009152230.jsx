import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <ul>
      <li
        onClick={() => {
          navigate("/");
        }}
      >
        Brand
      </li>
    </ul>
  );
}
