import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto py-10">
        <ul className="text- flex">
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

        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        <ul>
          {toolkits &&
            category === "All" &&
            toolkits.map((toolkit) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/detail/${toolkit.id}`, { state: { toolkit } });
                  }}
                >
                  <img
                    className="w-1/12 h-full object-cover mx-auto"
                    src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
                    alt="toolkit_img"
                  />
                  <p>{toolkit.title}</p>
                </li>
              );
            })}

          {toolkits &&
            category !== "All" &&
            toolkits
              .filter((toolkit) => toolkit.type === category)
              .map((toolkit) => {
                return (
                  <li>
                    <img
                      className="w-1/12 h-full object-cover mx-auto"
                      src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
                      alt="toolkit_img"
                    />
                    <p>{toolkit.title}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
