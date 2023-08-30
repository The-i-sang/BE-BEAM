import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";
import { PiThumbsUpDuotone, PiStairsFill } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import { PiTimerDuotone } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  const params = useParams().id;

  const handleDownload = () => {
    if (!toolkit || !toolkit.file) {
      console.error("Toolkit data or file not available.");
      return;
    }

    // 파일명 추출
    const fileName = toolkit.file.split("/").pop();

    // 파일 데이터를 public 폴더 기준으로 절대 경로를 가져옵니다.
    const fileUrl = `${process.env.PUBLIC_URL}${toolkit.file}`;
    console.log(fileUrl);

    // Fetch API를 사용하여 파일 데이터를 가져옵니다.
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Blob을 다운로드할 수 있는 URL 생성
        const url = URL.createObjectURL(blob);

        // 다운로드 링크 생성
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName; // 추출된 파일명 사용
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Blob URL 해제
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching file data:", error);
      });
  };

  const [recommendIndex, setRecommendIndex] = useState(0);

  useEffect(() => {
    if (toolkits) {
      const selectedToolkit = toolkits?.filter((t) => {
        return t.id !== params;
      });

      const randomIndex = Math.floor(Math.random() * selectedToolkit?.length);

      // Check if 'randomIndex' is a number and not NaN before setting 'recommendIndex'
      if (!isNaN(randomIndex)) {
        setRecommendIndex(randomIndex);
      }
    }
  }, []);
  console.log(recommendIndex);

  return (
    <div className="w-full pt-40 pb-28 bg-[#ffffff]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-6/12">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-5/12 text-[#282828]">
          <p className="text-[1rem] mb-4">{toolkit.type}</p>
          <p className="text-[2.1rem] font-semibold mb-7">{toolkit.title}</p>
          <p className="text-[1.125rem] leading-8 mb-[60px]">
            {toolkit.description}
          </p>

          <div className="mb-10">
            <div className="flex items-center">
              <div className="text-[1.4rem]">
                <PiThumbsUpDuotone />
              </div>
              <p className="font-semibold ml-3">
                다음과 같은 분들에게 유용해요
              </p>
            </div>

            <ul className="ml-10 mt-3">
              {toolkit.benefit.map((b) => {
                return <li className="list-disc mb-1">{b}</li>;
              })}
            </ul>
          </div>

          <div className="flex items-center mb-10">
            <div className="text-[1.4rem]">
              <PiTimerDuotone />
            </div>
            <p className="font-semibold ml-3">예상 소요시간</p>
            <p className="ml-3">{toolkit.option.time}</p>
          </div>

          <div className="flex items-center mb-20">
            <div className="text-[1.4rem]">
              <PiStairsFill />
            </div>
            <p className="font-semibold ml-3">난이도</p>
            <p className="ml-3">{toolkit.option.level}</p>
          </div>

          <div className="w-full pb-20 border-b-[1px] border-solid border-[#f5aa15]">
            <a
              href={`${process.env.PUBLIC_URL}${toolkit.file}`}
              target="_blank"
            >
              <button
                className="w-full p-6 box-border flex justify-center items-center bg-[#282828] text-[1.2rem] text-white"
                type="button"
                onClick={handleDownload}
              >
                <BsDownload />
                <p className="ml-6">툴키트 다운받기</p>
              </button>
            </a>
          </div>

          <div>
            {!isNaN(recommendIndex) && (
              <>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/../${selectedToolkit[recommendIndex].thumbnail}`
                  }
                  alt="recommend_img"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
