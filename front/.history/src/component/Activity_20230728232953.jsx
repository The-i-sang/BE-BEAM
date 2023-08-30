import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export default function Activity() {
  const {
    isLoading,
    error,
    data: activities,
  } = useQuery(["activities"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.activities);
  });

  const [categories, setCategories] = useState([
    { title: "Now", isActive: true },
    { title: "Closed", isActive: false },
  ]);

  return <div>activity</div>;
}
