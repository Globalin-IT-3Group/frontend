import { useEffect } from "react";
import UserApi from "../../api/userAPI";
export default function MainPage() {
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const result = await UserApi.test();
        console.log("결과!!!!!: ", result);
      } catch (error) {
        console.error("으앙아ㅏ아악", error);
      }
    };

    fetchTest();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800 text-black dark:text-white p-8 transition-all duration-300">
      <p className="text-2xl">메인 페이지입니당!</p>
    </div>
  );
}
