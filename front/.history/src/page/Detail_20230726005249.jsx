import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Detail() {
  const params = useParams().id;
  console.log(params);

  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  const {
    isLoading,
    error,
    data: slideImg,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  return (
    <div className="w-full pt-40 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10">
        {isLoading && "Loading..."}
        {error && "Occured error...!"}

        {slideImg &&
          slideImg
            .filter((img) => img.id === params)
            .map((img) => <DetailSlider img={img} />)}
        <p>{toolkit.title}</p>
      </div>
    </div>
  );
}
