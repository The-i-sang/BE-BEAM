// meeting에 관련된 데이터를 받아오는 곳.

import axios from "axios";

export const MeetingDataFetch = async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.PUBLIC_URL}/data/Toolkit.json`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.data.items.activities;
  return result;
};
