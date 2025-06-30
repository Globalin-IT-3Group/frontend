import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../api/userAPI";

import Email from "../../components/MyInfo/Email";
import Password from "../../components/MyInfo/Password";
import ProfileImage from "../../components/MyInfo/ProfileImage";
import StatusMessage from "../../components/MyInfo/StatusMessage";
import Nickname from "../../components/MyInfo/Nickname";
import PhoneNumber from "../../components/MyInfo/PhoneNumber";
import AccountRecoveryQuestion from "../../components/MyInfo/AccountRecoveryQuestion";
import AccountRecoveryAnswer from "../../components/MyInfo/AccountRecoveryAnswer";
import JoinDate from "../../components/MyInfo/JoinDate";

export default function MyInfoPage() {
  const user = useSelector((state) => state.auth);
  const userId = user.id;
  const nickname = user.nickname;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await userAPI.getUserInfo(userId);
      console.log(res);

      setUserInfo(res);
    };

    if (userId) fetchUserInfo();
  }, [userId]);

  if (!userInfo) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  const isKakao = userInfo.signupType === "KAKAO";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-4xl w-[1200px] h-auto p-10 mt-6 mb-14 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col dark:bg-zinc-700 dark:text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold mt-10 mb-12 text-[clamp(1.5rem,5vw,2.5rem)]">
            {nickname}님! 안녕하세요🖐️
          </h1>
          <ProfileImage src={userInfo.profileImage} />
          <StatusMessage initialMessage={userInfo.profileMessage} />
          <div className="w-full max-w-[1100px] h-px bg-gray-200 mt-20 flex items-center" />

          {!isKakao && (
            <form className="w-full max-w-[700px] mx-auto mt-10 p-8 space-y-10">
              <Email email={userInfo.email} />
              <Password initPassword={userInfo.password} />
              <Nickname nickname={userInfo.nickname} />
              <PhoneNumber phoneNumber={userInfo.phoneNumber} />
              <AccountRecoveryQuestion question={userInfo.question} />
              <AccountRecoveryAnswer answer={userInfo.answer} />
              <JoinDate createdAt={userInfo.createdAt} />
            </form>
          )}

          {isKakao && (
            <div className="w-full max-w-[700px] mx-auto mt-10 p-8 space-y-10">
              <Nickname nickname={userInfo.nickname} />
              <JoinDate createdAt={userInfo.createdAt} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
