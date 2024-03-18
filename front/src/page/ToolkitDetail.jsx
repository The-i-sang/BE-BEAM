import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailSlider from "../component/slider/DetailSlider";
import { useQuery } from "@tanstack/react-query";
import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";
import DetailToolkitSmallTitle from "../component/toolkit/DetailToolkitSmallTitle";

import {
  PiThumbsUpDuotone,
  PiStairsFill,
  PiTimerDuotone,
} from "react-icons/pi";
import { BsDownload, BsArrowRight } from "react-icons/bs";
import { CiHashtag } from "react-icons/ci";

export default function ToolkitDetail() {
  const navigate = useNavigate();
  const params = useParams().id;
  const {
    state: { toolkit },
  } = useLocation();

  const [recommendIndex, setRecommendIndex] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isToolkitReady, setIsToolkitReady] = useState(false);

  const { data } = useQuery(["data"], async () => {
    const result = await MeetingAndToolkitDataFetch();
    return result;
  });

  const toolkits = data?.toolkits;

  // toolkit pdf 파일 다운을 할 수 있도록 서버에서 기능 구현(현재는 프론트에서 구현되어 있음)
  const handleDownload = () => {
    if (!toolkit || !toolkit.file) {
      console.error("Toolkit data or file not available.");
      return;
    }

    const fileName = toolkit.file.split("/").pop();
    const fileUrl = `${process.env.PUBLIC_URL}${toolkit.file}`;

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching file data:", error);
      });
  };

  const selectedToolkit = toolkits?.filter((t) => {
    return t.id !== params;
  });

  useEffect(() => {
    if (selectedToolkit && selectedToolkit.length > 0 && !isToolkitReady) {
      setRandomIndex(Math.floor(Math.random() * selectedToolkit.length));
      setIsToolkitReady(true);
    }
  }, [selectedToolkit, isToolkitReady]);

  useEffect(() => {
    if (randomIndex >= 0) {
      if (randomIndex <= selectedToolkit?.length) {
        setRecommendIndex(randomIndex);
      } else {
        setRecommendIndex(0);
      }
    }
  }, [randomIndex]);

  return (
    <div className="w-full py-10 bg-[#ffffff] dark:bg-black">
      <div className="w-11/12 max-w-[90%] mx-auto">
        <h1 className="w-full mb:mb-20 sm:mb-14 mb-4 text-center sm:text-[3rem] text-[2.3rem] font-semibold dark:text-white">
          {toolkit.title}
        </h1>

        <div className="w-full flex md:flex-row sm:flex-col flex-col md:items-start md:justify-between">
          <div className="lg:w-[500px] md:w-[380px] sm:w-full w-full">
            {toolkit && <DetailSlider t={toolkit.image} />}
          </div>

          <div className="lg:w-w-1calc md:w-w-2calc sm:w-full w-full xl:pl-14 md:px-6 sm:px-0 px-0 md:py-0 sm:py-14 py-14 box-border text-[#282828] dark:text-white font-light">
            <div className="sm:mb-4 mb-2 flex sm:text-[1rem] text-[0.8rem]">
              <p className={`${toolkit.type ? "mr-4" : "mr-0"}`}>
                {toolkit.type}
              </p>

              <p>{toolkit.type2}</p>
            </div>

            <p className="sm:text-[2.1rem] text-[1.6rem] font-semibold sm:mb-7 mb-4">
              {toolkit.title}
            </p>
            <p className="sm:text-[1.125rem] text-[0.9rem] sm:mb-[60px] mb-[30px] font-normal">
              {toolkit.description}
            </p>

            <div className="sm:mb-10 mb-6">
              <DetailToolkitSmallTitle
                icon={<PiThumbsUpDuotone />}
                title="다음과 같은 분들에게 유용해요"
              />

              <ul className="ml-10 sm:mt-3 mt-1 sm:text-[1rem] text-[0.9rem]">
                {toolkit.benefit.map((b, idx) => {
                  return (
                    <li key={idx} className="list-disc mb-1">
                      {b}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center sm:mb-10 mb-6">
              <DetailToolkitSmallTitle icon={<PiStairsFill />} title="난이도" />
              <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                {toolkit.option.level}
              </p>
            </div>

            <div className="flex items-center sm:mb-10 mb-6">
              <DetailToolkitSmallTitle
                icon={<PiTimerDuotone />}
                title="예상 소요시간"
              />
              <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                {toolkit.option.time}
              </p>
            </div>

            <div className="flex items-center flex-wrap sm:mb-20 mb-14">
              <DetailToolkitSmallTitle icon={<CiHashtag />} title="태그" />
              {toolkit.keyword?.map((hashtag) => (
                <p className="ml-3 sm:text-[1rem] text-[0.9rem]">#{hashtag}</p>
              ))}
            </div>

            <div className="w-full pb-12 border-b-[1px] border-solid border-[#f5aa15]">
              <a
                href={process.env.PUBLIC_URL + toolkit.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="w-full sm:p-6 p-5 box-border flex justify-center items-center bg-[#282828] dark:bg-white text-[1.2rem] text-white dark:text-black"
                  type="button"
                  onClick={handleDownload}
                >
                  <BsDownload />
                  <p className="ml-6 sm:text-[1rem] text-[0.9rem]">
                    툴키트 다운받기
                  </p>
                </button>
              </a>
            </div>

            {selectedToolkit?.length >= 1 && (
              <div
                onClick={() => {
                  const toolkit = selectedToolkit[recommendIndex];
                  navigate(`/toolkit/detail/${toolkit.id}`, {
                    state: { toolkit },
                  });
                }}
                className="w-full sm:py-10 py-5 box-border flex flex-row justify-between items-center text-[#282828] cursor-pointer"
              >
                <div className="sm:w-3/4 w-3/4 flex items-center">
                  <img
                    className="sm:w-[60px] w-[40px] object-cover"
                    src={
                      process.env.PUBLIC_URL +
                      selectedToolkit[recommendIndex].thumbnail.replace(
                        "./",
                        "/"
                      )
                    }
                    alt="img"
                  />

                  <div className="sm:w-recomended-w-1calc w-recomended-w-2calc px-4 box-border flex flex-col dark:text-white">
                    <p className="sm:text-[0.875rem] text-[0.74rem]">
                      Another Toolkit Recommendation
                    </p>
                    <p className="sm:text-[1.125rem] text-[0.96rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {selectedToolkit[recommendIndex].title}
                    </p>
                  </div>
                </div>

                <button className="sm:w-1/4 w-1/4 flex justify-end items-center sm:text-[0.875rem] text-[0.8rem] dark:text-white">
                  <p>자세히 보기</p>
                  <div className="ml-1">
                    <BsArrowRight />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
