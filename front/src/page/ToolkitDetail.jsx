import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dataFetch } from "../api/meetingAndToolkit";
import DetailToolkitSmallTitle from "../component/toolkit/DetailToolkitSmallTitle";

import {
  PiThumbsUpDuotone,
  PiStairsFill,
  PiTimerDuotone,
} from "react-icons/pi";
import { BsDownload, BsArrowRight } from "react-icons/bs";
import { CiHashtag } from "react-icons/ci";
import BasicSlider from "../component/slider/BasicSlider";

export default function ToolkitDetail() {
  const navigate = useNavigate();

  const {
    state: { toolkitId },
  } = useLocation();

  const { isLoading, data, error } = useQuery(
    ["toolkitDetailData"],
    async () => {
      const result = await dataFetch(`toolkits/${toolkitId}`);
      return result;
    }
  );

  return (
    <>
      {data && (
        <div className="w-full py-10 bg-bg-light-default dark:bg-bg-dark-default">
          <div className="w-11/12 max-w-[90%] mx-auto">
            <h1 className="w-full mb:mb-20 sm:mb-14 mb-4 text-center sm:text-[3rem] text-[2.3rem] font-semibold dark:text-white">
              {data.title}
            </h1>

            <div className="flex flex-col w-full md:flex-row sm:flex-col md:items-start md:justify-between">
              <div className="lg:w-[500px] md:w-[380px] sm:w-full w-full">
                <BasicSlider>
                  {data.images.map((img, idx) => (
                    <div key={idx} className="w-full h-[640px]">
                      <img
                        className="object-contain w-4/6 h-full mx-auto lg:w-4/6 md:w-5/6 sm:w-4/6"
                        src={img}
                        alt="img"
                      />
                    </div>
                  ))}
                </BasicSlider>
              </div>

              <div className="lg:w-w-1calc md:w-w-2calc sm:w-full w-full xl:pl-14 md:px-6 sm:px-0 px-0 md:py-0 sm:py-14 py-14 box-border text-[#282828] dark:text-white font-light">
                <div className="sm:mb-4 mb-2 flex sm:text-[1rem] text-[0.8rem]">
                  <p className="mr-4">{data.type}</p>

                  <p>{data.type2}</p>
                </div>

                <p className="sm:text-[2.1rem] text-[1.6rem] font-semibold sm:mb-7 mb-4">
                  {data.title}
                </p>
                <p className="sm:text-[1.125rem] text-[0.9rem] sm:mb-[60px] mb-[30px] font-normal">
                  {data.description}
                </p>

                <div className="mb-6 sm:mb-10">
                  <DetailToolkitSmallTitle
                    icon={<PiThumbsUpDuotone />}
                    title="다음과 같은 분들에게 유용해요"
                  />

                  <ul className="ml-10 sm:mt-3 mt-1 sm:text-[1rem] text-[0.9rem]">
                    {data.benefits.map((text, idx) => {
                      return (
                        <li key={idx} className="mb-1 list-disc">
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex items-center mb-6 sm:mb-10">
                  <DetailToolkitSmallTitle
                    icon={<PiStairsFill />}
                    title="난이도"
                  />
                  <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                    {data.option.level}
                  </p>
                </div>

                <div className="flex items-center mb-6 sm:mb-10">
                  <DetailToolkitSmallTitle
                    icon={<PiTimerDuotone />}
                    title="예상 소요시간"
                  />
                  <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                    {data.option.time}
                  </p>
                </div>

                <div className="flex flex-wrap items-center sm:mb-20 mb-14">
                  <DetailToolkitSmallTitle icon={<CiHashtag />} title="태그" />
                  {data.keywords?.map((keyword) => (
                    <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                      #{keyword}
                    </p>
                  ))}
                </div>

                <div className="w-full pb-12 border-b-[1px] border-solid border-[#f5aa15]">
                  <a
                    href={process.env.PUBLIC_URL + data.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="w-full sm:p-6 p-5 box-border flex justify-center items-center bg-[#282828] dark:bg-white text-[1.2rem] text-white dark:text-black"
                      type="button"
                      // onClick={handleDownload}
                    >
                      <BsDownload />
                      <p className="ml-6 sm:text-[1rem] text-[0.9rem]">
                        툴키트 다운받기
                      </p>
                    </button>
                  </a>
                </div>

                <div
                  onClick={() => {
                    navigate(`/toolkit/detail/${data.recommendation.id}`, {
                      state: { toolkitId: data.recommendation.id },
                    });
                  }}
                  className="w-full sm:py-10 py-5 box-border flex flex-row justify-between items-center text-[#282828] cursor-pointer"
                >
                  <div className="flex items-center w-3/4 sm:w-3/4">
                    <img
                      className="sm:w-[60px] w-[40px] object-cover"
                      src={data.recommendation.thumbnail}
                      alt="img"
                    />

                    <div className="box-border flex flex-col px-4 sm:w-recomended-w-1calc w-recomended-w-2calc dark:text-white">
                      <p className="sm:text-[0.875rem] text-[0.74rem]">
                        Another Toolkit Recommendation
                      </p>
                      <p className="sm:text-[1.125rem] text-[0.96rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                        {data.recommendation.title}
                      </p>
                    </div>
                  </div>

                  <button className="sm:w-1/4 w-1/4 flex justify-end items-center sm:text-[0.875rem] text-[0.8rem] dark:text-white">
                    <p>자세히 보기</p>
                    <BsArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
