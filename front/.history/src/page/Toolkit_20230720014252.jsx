import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Toolkit() {
  const categories = ["All", "Work", "Life"];

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items);
  });

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
