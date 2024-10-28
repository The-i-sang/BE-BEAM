import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState";
import { dataFetch, fetchDownloadToolkit } from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";

import DetailToolkitSmallTitle from "../component/toolkit/DetailToolkitSmallTitle";
import BasicSlider from "../component/slider/BasicSlider";
import { Toast } from "../component/toast/Toast";
import Button from "../component/button/Button";
import { btnBasicStyle, btnStyle } from "../common2";

import {
  PiThumbsUpDuotone,
  PiStairsFill,
  PiTimerDuotone,
} from "react-icons/pi";
import { BsDownload, BsArrowRight } from "react-icons/bs";
import { CiHashtag } from "react-icons/ci";

export default function ToolkitDetail() {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(AccessTokenState);

  const {
    state: { toolkitId },
  } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["toolkitDetailData", accessToken],
    queryFn: async () => {
      const result = await dataFetch(accessToken, `toolkits/${toolkitId}`);
      return result;
    },
  });

  const comment = handleConsoleError(isLoading, error);

  return (
    <div className="w-full py-10 bg-bg-light-default dark:bg-bg-dark-default">
      <div className="w-11/12 max-w-[90%] mx-auto">
        {comment}

        <h1 className="w-full mb:mb-20 sm:mb-14 mb-4 text-center sm:text-[3rem] text-[2.3rem] font-semibold dark:text-white">
          {data?.title}
        </h1>

        <div className="flex flex-col w-full md:flex-row sm:flex-col md:items-start md:justify-between">
          <div className="lg:w-[500px] md:w-[380px] sm:w-full w-full">
            <BasicSlider
              isDots={false}
              prevArrowStyles="top-[42%] left-0"
              nextArrowStyles="top-[42%] right-0"
              arrowFontStyles="text-[4rem] text-white"
            >
              {data?.images?.map((img, idx) => (
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
              <p className="mr-4">{data?.toolkitType}</p>

              <p>{data?.personType}</p>
            </div>

            <p className="sm:text-[2.1rem] text-[1.6rem] font-semibold sm:mb-7 mb-4">
              {data?.title}
            </p>
            <p className="sm:text-[1.125rem] text-[0.9rem] sm:mb-[60px] mb-[30px] font-normal">
              {data?.description}
            </p>

            <div className="mb-6 sm:mb-10">
              <DetailToolkitSmallTitle
                icon={<PiThumbsUpDuotone />}
                title="다음과 같은 분들에게 유용해요"
              />

              <ul className="ml-10 sm:mt-3 mt-1 sm:text-[1rem] text-[0.9rem]">
                {data?.benefits?.map((text, idx) => {
                  return (
                    <li key={idx} className="mb-1 list-disc">
                      {text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center mb-6 sm:mb-10">
              <DetailToolkitSmallTitle icon={<PiStairsFill />} title="난이도" />
              <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                {data?.option?.level}
              </p>
            </div>

            <div className="flex items-center mb-6 sm:mb-10">
              <DetailToolkitSmallTitle
                icon={<PiTimerDuotone />}
                title="예상 소요시간"
              />
              <p className="ml-3 sm:text-[1rem] text-[0.9rem]">
                {data?.option?.time}
              </p>
            </div>

            <div className="flex flex-wrap items-center sm:mb-20 mb-14">
              <DetailToolkitSmallTitle icon={<CiHashtag />} title="태그" />
              {data?.keywords?.map((keyword, idx) => (
                <p key={idx} className="ml-3 sm:text-[1rem] text-[0.9rem]">
                  #{keyword}
                </p>
              ))}
            </div>

            <div className="w-full pb-12 border-b-[1px] border-solid border-[#f5aa15]">
              <a href={data?.file} target="_blank" rel="noopener noreferrer">
                <Button
                  icon={<BsDownload />}
                  onClick={() => {
                    const handleDownloadToolkit = async () => {
                      try {
                        const blob = await fetchDownloadToolkit(data?.file);
                        const downloadUrl = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = downloadUrl;
                        link.download = "Toolkit.pdf";
                        link.click();
                        URL.revokeObjectURL(downloadUrl);

                        Toast("툴킷 다운로드를 성공했습니다.!😍");
                      } catch (error) {
                        Toast("툴킷 다운로드에 실패했습니다...😢");
                      }
                    };
                    handleDownloadToolkit();
                  }}
                  basicStyle={btnBasicStyle.basic}
                  styles={`${btnStyle.blackBg} w-full py-5`}
                >
                  <p className="ml-6 sm:text-[1rem] text-[0.9rem]">
                    툴키트 다운받기
                  </p>
                </Button>
              </a>
            </div>

            <div
              onClick={() => {
                navigate(`/toolkit/detail/${data?.recommendation?.id}`, {
                  state: { toolkitId: data?.recommendation?.id },
                });
              }}
              className="w-full sm:py-10 py-5 box-border flex flex-row justify-between items-center text-[#282828] cursor-pointer"
            >
              <div className="flex items-center w-3/4 sm:w-3/4">
                <img
                  className="sm:w-[60px] w-[40px] object-cover"
                  src={data?.recommendation?.thumbnail}
                  alt="img"
                />

                <div className="box-border flex flex-col px-4 sm:w-recomended-w-1calc w-recomended-w-2calc dark:text-white">
                  <p className="sm:text-[0.875rem] text-[0.74rem]">
                    Another Toolkit Recommendation
                  </p>
                  <p className="sm:text-[1.125rem] text-[0.96rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    {data?.recommendation?.title}
                  </p>
                </div>
              </div>

              <Button
                buttonText="자세히 보기"
                basicStyle={btnBasicStyle.basic}
                styles="sm:text-[0.875rem] text-[0.8rem] dark:text-white"
              >
                <BsArrowRight className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
