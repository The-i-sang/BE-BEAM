import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Toolkit() {
  const categories = ["All", "Work", "Life"];

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items);
  });

  const [category, setCategory] = useState("");

  return (
    <div>
      <ul>
        {categories.map((category) => {
          return <li>{category}</li>;
        })}
      </ul>
    </div>
  );
}
