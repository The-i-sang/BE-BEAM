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
      .then((res) => res.data.items.toolkits);
  });

  const [category, setCategory] = useState("All");
  console.log(category);
  console.log(toolkits);

  return (
    <div>
      <ul className="flex">
        {categories.map((cate) => {
          return (
            <li
              onClick={() => {
                setCategory(cate);
              }}
            >
              {cate}
            </li>
          );
        })}
      </ul>
      <p>{category}</p>

      <ul></ul>
    </div>
  );
}
