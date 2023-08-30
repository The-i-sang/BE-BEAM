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
  console.log(category);

  return (
    <div>
      <ul>
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
    </div>
  );
}
