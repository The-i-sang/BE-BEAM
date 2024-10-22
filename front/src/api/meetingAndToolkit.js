// meeting / toolkit에 관련된 데이터를 받아오는 곳.

import axios from "axios";

export const MeetingAndToolkitDataFetch = async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.PUBLIC_URL}/data/Toolkit.json`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.data.items;
  return result;
};

export const dataFetch = async (detailUrl) => {
  const res = await axios({
    method: "get",
    url: `https://prod.be-beam.site/api/web/v1/${detailUrl}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.data.result;
  return result;
};
