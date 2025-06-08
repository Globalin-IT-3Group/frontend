import Email from "../../components/MyInfo/Email";
import Name from "../../components/MyInfo/Name";
import Password from "../../components/MyInfo/Password";
import CheckPassword from "../../components/MyInfo/CheckPassword";
import ProfileImage from "../../components/ProfileImage";
import StatusMessage from "../../components/StatusMessage";
import Nickname from "../../components/MyInfo/Nickname";
import PhoneNumber from "../../components/MyInfo/PhoneNumber";
import AccountRecoveryQuestion from "../../components/MyInfo/AccountRecoveryQuestion";
import AccountRecoveryAnswer from "../../components/MyInfo/AccountRecoveryAnswer";
import JoinDate from "../../components/MyInfo/JoinDate";

export default function MyInfoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-4xl w-[1200px] h-auto p-10 mt-20 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mt-10 mb-12">
            감바님! 안녕하세요🖐️
          </h1>
          <ProfileImage />
          <StatusMessage />
          <div className="w-[1100px] h-px bg-gray-200 mt-20 flex items-center" />

          <form className="w-full max-w-[600px] mx-auto mt-10 p-8 space-y-16">
            <Email />
            <Password />
            <CheckPassword />
            <Name />
            <Nickname />
            <PhoneNumber />
            <AccountRecoveryQuestion />
            <AccountRecoveryAnswer />
            <JoinDate />
          </form>
        </div>
      </div>
    </div>
  );
}
