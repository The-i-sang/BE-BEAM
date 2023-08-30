import React from "react";

export default function Navbar() {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/logo/logo.jpg"} alt="logo" />
    </div>
  );
}
