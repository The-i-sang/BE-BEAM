import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { formatDateAndTime } from "../../../common";
import { fetchMeetingLikeOrCancel } from "../../../api/meetingAndToolkit";

import Button from "../../button/Button";
import { Toast } from "../../toast/Toast";

import { FaLocationDot } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function MeetingCard({
  data,
  setStoredDatas,
  accessToken,
  bgColor,
  shadow,
}) {
  const navigate = useNavigate();

  const changeMeetingLikeMutation = useMutation({
    mutationFn: () =>
      fetchMeetingLikeOrCancel(
        accessToken,
        data.id,
        data?.liked ? "delete" : "post"
      ),
    onSuccess: () => {
      setStoredDatas((prev) =>
        prev?.map((meeting) => {
          if (meeting?.id === data?.id) {
            return { ...meeting, liked: data?.liked ? false : true };
          } else {
            return meeting;
          }
        })
      );
      Toast(data?.liked ? "좋아요를 취소하였습니다." : "좋아요를 눌렀습니다.");
    },
  });

  return (
    <li
      className={`${bgColor} cursor-pointer w-full h-full sm:mb-0 mb-5 p-6 box-border dark:bg-[#383a4a] text-text-light-90 rounded-md flex md:flex-row sm:flex-col flex-col relative overflow-hidden shadow-[0_5px_5px_2px_#ebebeb] dark:shadow-none`}
    >
      <img
        className={`${shadow} lg:w-[164px] md:w-[140px] sm:w-full w-full aspect-square object-cover object-center rounded-full dark:shadow-[0_5px_5px_2px_#262630]`}
        src={data.thumbnailImage}
        alt="thumbnail"
      />

      <div className="box-border px-0 py-4 lg:w-1calc md:w-2calc md:px-4 sm:px-0 md:py-0 sm:py-4">
        <div className="flex items-center justify-between w-full">
          <div className="lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] flex items-center gap-x-2">
            <p className="inline-block px-4 py-1 overflow-hidden text-white rounded-full sm:py-2 bg-gradient-to-r from-[#38bdf8] to-[#34d399] whitespace-nowrap text-ellipsis">
              {data.recruitmentType}
            </p>

            <p
              className={`${
                data.recommend ? "block" : "hidden"
              } inline-block px-4 py-1 overflow-hidden text-white rounded-full sm:py-2 bg-gradient-to-r from-[#818cf8] to-[#f472b6] whitespace-nowrap text-ellipsis`}
            >
              추천
            </p>
          </div>

          <Button
            icon={data.liked ? <GoHeartFill /> : <GoHeart />}
            styles="text-[1.5rem] dark:text-text-dark-default"
            onClick={() => {
              try {
                changeMeetingLikeMutation.mutate();
              } catch (error) {
                Toast(
                  data?.liked
                    ? "좋아요를 취소하지 못하였습니다."
                    : "좋아요를 누르지 못하였습니다."
                );
              }
            }}
          />
        </div>

        <div
          onClick={() => {
            navigate(`/meeting/detail/${data.id}`);
          }}
          className="mt-4 dark:text-text-dark-default"
        >
          <h1 className="mb-2 lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {data.name}
          </h1>

          <p className="mb-2 lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-text-light-70 dark:text-text-dark-10 whitespace-nowrap overflow-hidden text-ellipsis">
            {data.recruitmentStatus} ·
            {`${formatDateAndTime(data.meetingDatetime)}에 모집 마감`}
          </p>
          <div className="flex items-center lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-white">
            <FaLocationDot className="lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem]" />
            {data.location}
          </div>
        </div>
      </div>

      <img
        className="xl:w-[140px] lg:w-[120px] md:w-[100px] sm:w-[130px] w-[30%] absolute md:bottom-[-20%] md:right-[-5%] sm:bottom-[-12%] sm:right-[-12%] bottom-[-5%] right-[-5%]"
        src={"/image/deco.png"}
        alt="deco"
      />
    </li>
  );
}
