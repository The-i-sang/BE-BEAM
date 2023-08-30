import React, { useState } from "react";

export default function Activity() {
  const [categories, setCategories] = useState([
    { title: "Now", isActive: true },
    { title: "Closed", isActive: false },
  ]);

  return <div>activity</div>;
}
