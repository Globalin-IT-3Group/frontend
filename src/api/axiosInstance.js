import axios from "axios";
// import store from "../store";
// import { openLoginModal } from "../store/reducers/auth";

export default class BaseApi {
  constructor(url) {
    axios.defaults.withCredentials = true;

    this.fetcher = axios.create({
      baseURL: url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 인터셉터 설정
    this.fetcher.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // 401 인증 실패 시 로그인 모달 열기
          //   store.dispatch(openLoginModal());
        }
        return Promise.reject(error);
      }
    );
  }
}
