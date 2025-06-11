import React from "react";

export default function NotFoundPage() {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center mx-auto">
      <h1 className="font-bold text-9xl text-[#003CFF] mb-6">404</h1>
      <h2 className="font-bold text-2xl mb-14">페이지를 찾을 수 없습니다</h2>
      <div className="text-lg">존재하지 않는 주소를 입력하셨거나,</div>
      <div className="text-lg mb-20">
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </div>
      <button
        onClick={handleGoBack}
        className="bg-[#003CFF] text-lg text-white px-5 py-3 rounded-3xl"
      >
        이전 페이지로
      </button>
    </div>
  );
}
