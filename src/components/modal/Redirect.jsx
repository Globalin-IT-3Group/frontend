import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

//useLocation() : 현재 URL에서 쿼리스트링(?code=...) 가져오기
//useNavigate(): 페이지 이동을 위한 훅
//useEffect(): 컴포넌트 마운트 시 한 번 실행되는 사이드 이펙트 함수
//axios: HTTP 요청 라이브러리(서버로 code 전송송)

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    //URL에서 code(?code= ....)값 추출

    if (code) {
      axios
        .post(`${import.meta.env.VITE_BASE_URI}/auth`, { code: code })
        // 백엔드 로그인 API에 POST 요청 보냄
        // payload(서버에 전달되는 실질적인 데이터)로 코드 전달

        .then((Response) => {
          //성공시
          const user = Response.data; //응답 데이터를 user에 저장
          console.log(user);

          // dispatch(setUser(user)); => Redux 액션으로 로그인 상태 저장장
          navigate("/"); // 최종적으로 메인 페이지로 리다이렉션
        })

        .catch((err) => {
          //실패시
          console.error(err);
        });
    } else {
      console.error("인가 코드가 URL에 없습니다"); //쿼리스트링에 code가 없는 경우
    }
  }, [location, navigate]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Redirect;
