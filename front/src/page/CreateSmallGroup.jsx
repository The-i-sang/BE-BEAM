import { useState } from "react";

function CreateSmallGroup() {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 3));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="w-6/12 sm:max-w-[90%] mx-auto md:mt-16 sm:mt-8 mt-8 sm:mb-20 mb-12">
        <h1 className="mb-4 text-2xl font-bold">소모임 개설하기</h1>
        <div className="p-6 border rounded-lg shadow-lg">
          {/* 첫 번째 페이지: 소모임 정보 입력하기 */}
          <div className={`${currentPage === 1 ? "block" : "hidden"}`}>
            <h2 className="mb-4 text-xl font-semibold">소모임 정보 입력하기</h2>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="groupName"
              >
                소모임 이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="groupName"
                placeholder="소모임 이름을 입력해주세요"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="minPeople"
                >
                  최소인원
                </label>
                <input
                  type="number"
                  id="minPeople"
                  placeholder="최소인원"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="maxPeople"
                >
                  최대인원
                </label>
                <input
                  type="number"
                  id="maxPeople"
                  placeholder="최대인원"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="meetingDate"
              >
                모임 날짜
              </label>
              <input
                type="date"
                id="meetingDate"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">선호옵션</label>
              <div className="flex flex-wrap items-center space-x-4">
                <button className="px-4 py-2 text-white bg-yellow-400 rounded-lg">
                  실내형
                </button>
                <button className="px-4 py-2 text-white bg-yellow-400 rounded-lg">
                  실외형
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="description"
              >
                소모임 소개글
              </label>
              <textarea
                id="description"
                placeholder="소모임 소개글을 입력해주세요"
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                소모임 사진 등록
              </label>
              <input type="file" className="mb-2" />
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="preview"
                  className="object-cover w-full h-20"
                />
                <img
                  src="https://via.placeholder.com/80"
                  alt="preview"
                  className="object-cover w-full h-20"
                />
                <img
                  src="https://via.placeholder.com/80"
                  alt="preview"
                  className="object-cover w-full h-20"
                />
                <img
                  src="https://via.placeholder.com/80"
                  alt="preview"
                  className="object-cover w-full h-20"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="location"
              >
                모임 장소
              </label>
              <input
                type="text"
                id="location"
                placeholder="모임 장소를 입력해주세요"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="w-full mb-4">
              <label className="block mb-2 text-sm font-medium">
                소모임 회차 설정
              </label>
              <div className="w-full space-y-2">
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <input
                    type="date"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="소모임 내용을 입력하세요"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-full"
                  />
                  <button className="w-12 h-12 px-3 py-2 text-white bg-red-500 rounded-lg">
                    -
                  </button>
                </div>
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <input
                    type="date"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="소모임 내용을 입력하세요"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-full"
                  />
                  <button className="w-12 h-12 px-3 py-2 text-white bg-red-500 rounded-lg">
                    -
                  </button>
                </div>
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <input
                    type="date"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="소모임 내용을 입력하세요"
                    className="w-full h-12 px-3 py-2 border rounded-md sm:w-full"
                  />
                  <button className="w-12 h-12 px-3 py-2 text-white bg-green-500 rounded-lg">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 두 번째 페이지: 호스트 정보 */}
          <div className={`${currentPage === 2 ? "block" : "hidden"}`}>
            <h2 className="mb-4 text-xl font-semibold">호스트 정보</h2>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="hostDescription"
              >
                호스트 설명
              </label>
              <input
                type="text"
                id="hostDescription"
                placeholder="호스트(본인)에 대해서 간략 소개를 해주세요"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                호스트 사진
              </label>
              <input type="file" className="mb-2" />
              <div className="flex space-x-2">
                <img
                  src="https://via.placeholder.com/540"
                  alt="host"
                  className="object-cover w-40 h-40"
                />
              </div>
            </div>
          </div>

          {/* 세 번째 페이지: 결제 정보 */}
          <div className={`${currentPage === 3 ? "block" : "hidden"}`}>
            <h2 className="mb-4 text-xl font-semibold">결제 정보</h2>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="participationFee"
              >
                참여비용
              </label>
              <input
                type="number"
                id="participationFee"
                placeholder="참여비용을 입력하세요"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="paymentAmount"
              >
                결제금액
              </label>
              <input
                type="number"
                id="paymentAmount"
                placeholder="결제금액을 입력하세요"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">결제방식</label>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-black bg-gray-300 rounded-lg">
                  자체 결제 시스템 이용
                </button>
                <button className="px-4 py-2 text-black bg-gray-300 rounded-lg">
                  가상계좌
                </button>
                <button className="px-4 py-2 text-black bg-gray-300 rounded-lg">
                  계좌입력
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full">
            <button
              className={`${
                currentPage === 1 ? "hidden" : "block"
              } px-6 py-2 text-white bg-black rounded-lg`}
              onClick={prevPage}
            >
              이전
            </button>

            <button
              type={currentPage < 3 ? "button" : "submit"}
              onClick={() => {
                if (currentPage < 3) {
                  nextPage();
                } else {
                  alert("소모임 생성 완료!");
                }
              }}
              className="px-6 py-2 ml-auto text-white bg-black rounded-lg"
            >
              {currentPage < 3 ? "다음" : "소모임 생성"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSmallGroup;
