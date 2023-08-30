import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";
import { PiThumbsUpLight, PiTimerLight, PiStairsFill } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  const handleDownload = () => {
    // 여기서 파일 다운로드 로직을 추가하면 됩니다.
    // 예를 들면, FileSaver.js 또는 axios 등을 사용하여 서버에서 파일을 가져와 다운로드하는 방법이 있습니다.
    // 하지만, 이 예시에서는 단순히 텍스트 파일을 다운로드하는 방법을 보여드리겠습니다.

    const filename = "example.txt";
    const text = "Hello, this is an example file for download in React!";

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full py-40 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-5/12">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-5/12">
          <p>{toolkit.type}</p>
          <p>{toolkit.title}</p>
          <p>{toolkit.description}</p>

          <div>
            <div>
              <PiThumbsUpLight />
              <p>다음과 같은 분들에게 유용해요</p>
            </div>

            <ul>
              {toolkit.benefit.map((b) => {
                return <li>{b}</li>;
              })}
            </ul>
          </div>

          <div>
            <PiTimerLight />
            <p>예상 소요시간</p>
            <p>{toolkit.option.time}</p>
          </div>

          <div>
            <PiStairsFill />
            <p>난이도</p>
            <p>{toolkit.option.level}</p>
          </div>

          <button
            className="w-full p-6 box-border flex justify-center items-center bg-[#282828] text-[1.2rem] text-white"
            type="button"
            onClick={handleDownload}
          >
            <BsDownload />
            <p className="ml-6">툴키트 다운받기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
