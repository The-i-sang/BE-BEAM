import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function Search() {
  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });
  console.log(toolkits);

  return <div></div>;
}
