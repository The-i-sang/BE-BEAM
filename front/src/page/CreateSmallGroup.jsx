import React, { useState } from 'react';

function CreateSmallGroup() {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 3));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">소모임 개설하기</h1>
      <div className="border p-6 rounded-lg shadow-lg">
        
        {/* 첫 번째 페이지: 소모임 정보 입력하기 */}
        {currentPage === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">소모임 정보 입력하기</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="groupName">소모임 이름 <span className="text-red-500">*</span></label>
              <input type="text" id="groupName" placeholder="소모임 이름을 입력해주세요" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="minPeople">최소인원</label>
                <input type="number" id="minPeople" placeholder="최소인원" className="w-full px-3 py-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="maxPeople">최대인원</label>
                <input type="number" id="maxPeople" placeholder="최대인원" className="w-full px-3 py-2 border rounded-md"/>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="meetingDate">모임 날짜</label>
              <input type="date" id="meetingDate" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">선호옵션</label>
              <div className="flex items-center">
                <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg mr-4">실내형</button>
                <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg">실외형</button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="description">소모임 소개글</label>
              <textarea id="description" placeholder="소모임 소개글을 입력해주세요" className="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">소모임 사진 등록</label>
              <input type="file" className="mb-2"/>
              <div className="flex space-x-2">
                <img src="https://via.placeholder.com/80" alt="preview" className="w-20 h-20 object-cover"/>
                <img src="https://via.placeholder.com/80" alt="preview" className="w-20 h-20 object-cover"/>
                <img src="https://via.placeholder.com/80" alt="preview" className="w-20 h-20 object-cover"/>
                <img src="https://via.placeholder.com/80" alt="preview" className="w-20 h-20 object-cover"/>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="location">모임 장소</label>
              <input type="text" id="location" placeholder="모임 장소를 입력해주세요" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">소모임 회차 설정</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="date" className="px-3 py-2 border rounded-md"/>
                  <input type="text" placeholder="소모임 내용을 입력하세요" className="flex-grow px-3 py-2 border rounded-md"/>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-lg">-</button>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="date" className="px-3 py-2 border rounded-md"/>
                  <input type="text" placeholder="소모임 내용을 입력하세요" className="flex-grow px-3 py-2 border rounded-md"/>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-lg">-</button>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="date" className="px-3 py-2 border rounded-md"/>
                  <input type="text" placeholder="소모임 내용을 입력하세요" className="flex-grow px-3 py-2 border rounded-md"/>
                  <button className="bg-green-500 text-white px-3 py-2 rounded-lg">+</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 두 번째 페이지: 호스트 정보 */}
        {currentPage === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">호스트 정보</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="hostDescription">호스트 설명</label>
              <input type="text" id="hostDescription" placeholder="호스트(본인)에 대해서 간략 소개를 해주세요" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">호스트 사진</label>
              <input type="file" className="mb-2"/>
              <div className="flex space-x-2">
                <img src="https://via.placeholder.com/540" alt="host" className="w-40 h-40 object-cover"/>
              </div>
            </div>
          </div>
        )}

        {/* 세 번째 페이지: 결제 정보 */}
        {currentPage === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="participationFee">참여비용</label>
              <input type="number" id="participationFee" placeholder="참여비용을 입력하세요" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="paymentAmount">결제금액</label>
              <input type="number" id="paymentAmount" placeholder="결제금액을 입력하세요" className="w-full px-3 py-2 border rounded-md"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">결제방식</label>
              <div className="flex space-x-2">
                <button className="bg-gray-300 text-black px-4 py-2 rounded-lg">자체 결제 시스템 이용</button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded-lg">가상계좌</button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded-lg">계좌입력</button>
              </div>
            </div>
          </div>
        )}

        {/* 이전/다음/소모임 생성 버튼 */}
        <div className="flex justify-between mt-8">
          {currentPage > 1 && (
            <button onClick={prevPage} className="bg-gray-300 text-black px-6 py-2 rounded-lg">
              이전
            </button>
          )}
          {currentPage < 3 ? (
            <button onClick={nextPage} className="bg-black text-white px-6 py-2 rounded-lg ml-auto">
              다음
            </button>
          ) : (
            <button className="bg-black text-white px-6 py-2 rounded-lg ml-auto">
              소모임 생성
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateSmallGroup;





/*
import React from 'react'

function CreateSmallGroup() {
  return (
    <div>안녕</div>
  )
}

export default CreateSmallGroup
*/