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

export const dataFetch = async (accessToken, detailUrl) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/${detailUrl}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching Data Fetch:", error);
    throw error;
  }
};

export const fetchMeetingLikeOrCancel = async (
  accessToken,
  meetingId,
  method
) => {
  try {
    const res = await axios({
      method: method,
      url: `https://prod.be-beam.site/api/web/v1//meetings/${meetingId}/like`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    alert(res.data.result);
  } catch (error) {
    console.error("Error fetching Meeting Like:", error);
    throw error;
  }
};
