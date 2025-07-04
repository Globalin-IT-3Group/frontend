import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../../components/Login/LoginModal";
import Reveal from "../../components/Reveal";

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const formSectionRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      {/* 헤더 */}
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="text-xl font-bold">
          <Link
            to="/"
            style={{ fontFamily: '"Nico Moji", sans-serif' }}
            className="text-4xl text-[#003CFF] font-bold dark:text-white"
          >
            コツコツ
          </Link>
        </div>
        <nav className="space-x-8 text-sm font-medium">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-[#003CFF] text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-500 transition duration-300"
          >
            로그인
          </button>
        </nav>
      </header>

      {/* 섹션1 */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="ml-14">
            <h1
              style={{ fontFamily: '"Nico Moji", sans-serif' }}
              className="text-5xl md:text-8xl font-bolds leading-snug whitespace-pre-line"
            >
              コツコツ
            </h1>
            <p className="text-2xl mt-6 leading-relaxed">
              코츠코츠에 대해 알아보아요!
            </p>
          </div>
          <div>
            <img
              src="https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
              alt="데이터 시각화"
              className="rounded-full shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 섹션2 */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div className="flex justify-center">
            <img
              src="https://www.trizstudio.com/assets/uploads/pingu-001.jpg" // ← 여기에 실제 이미지 경로 삽입
              alt="서비스 가이드 이미지"
              className="w-full max-w-md rounded-xl "
            />
          </div>
          {/* 왼쪽 텍스트 영역 */}
          <Reveal direction="left">
            <div>
              <h2 className="text-3xl text-blue-600 font-bold mb-8">
                서비스 이용 방법 가이드
              </h2>
              <div className="space-y-8">
                {/* 각각 내부도 감싸면 순차 애니메이션 가능 */}
                <Reveal delay={0.1}>
                  <div>스터디 룸을 만들고, 사람들과 함께 공부해보세요!</div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div>
                    모르는 단어가 생긴다면, 단어장과 내 노트를 이용해요!
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div>
                    오늘의 단어카드를 이용해 하루에 공부할 양을 정해봐요!
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div>오늘의 일본 뉴스도 스터디에서 읽어봐요!</div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 섹션3 - CTA */}
      <Reveal direction="up">
        <section className="bg-gradient-to-r from-[#7696FF] to-[#4E78FF] text-white py-32 px-6 text-center">
          <h2 className="text-3xl font-bold">사람들과 함께하세요!</h2>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-xl mx-auto">
              코츠코츠에서 당신을 기다리고 있어요!
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.4}>
            <button
              className="mt-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-500 transition cursor-pointer"
              onClick={() => {
                formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              함께하기
            </button>
          </Reveal>
        </section>
      </Reveal>

      {/* 섹션4 - 소개 */}
      <Reveal direction="left">
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl text-blue-600 font-bold ">기획 배경</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">스터디 모임</h3>
              <div className="text-sm text-gray-700">
                <p>일본어 공부의 필요성을 느껴,</p>
                <p> 스터디를 만들어 사람들과 함께 공부하고싶어요!</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">공간적 제약</h3>
              <div className="text-sm text-gray-700">
                <p>스터디는 만들었는데...</p>
                <p>공부할 공간도 마땅치 않고, 각자 사는곳이 너무 멀어요!</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 ">시간적 제약</h3>
              <div className="text-sm text-gray-700">
                <p>사는곳이 멀다보니 시간에도 제약이 생겨</p>{" "}
                <p>만나기 더 힘들어요!</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 섹션5 - 신청 폼 */}
      <Reveal direction="left">
        <section
          ref={formSectionRef}
          className="py-24 px-6 bg-[#4E78FF] text-white py-20 px-6"
        >
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">함께하기</h2>
            <p className="mt-4">コツコツ와 함께 일본어를 공부해보세요!</p>
          </div>
          <form className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button
              type="button" // ← 수정
              onClick={() => navigate("/join")} // ← 회원가입 페이지로 이동
              className="col-span-2 mt-6 bg-white text-[#003CFF] py-3 rounded-full cursor-pointer hover:scale-105 hover:bg-blue-100 transition duration-200 hover:font-bold"
            >
              회원가입
            </button>
          </form>
        </section>
      </Reveal>

      {/* 푸터 */}
      <footer className="bg-white text-blue-400 text-center text-sm py-12">
        <p className="mb-2">이메일: globalin01@naver.com</p>
        <p className="mb-2">전화: 02-701-1712</p>
        <p className="mb-2">
          주소: 서울특별시 영등포구 영중로 56 [신한빌딩 4층]
        </p>
        <p className="mt-4">
          ©2025 BY P3 Team.{" "}
          <a href="https://github.com/Globalin-IT-3Group" className="underline">
            Created by kotsukotsu
          </a>
        </p>
      </footer>
      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

/*
  폰트 커스터마이징 위치 (Tailwind 또는 외부 CSS 적용 가능):
  className="font-sans" → 여기에 원하는 폰트 적용
*/
