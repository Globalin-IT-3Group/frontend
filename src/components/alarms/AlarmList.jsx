import NotificationApi from "../../api/notificationAPI";
import Alarm from "./Alarm";
import { useState } from "react";

export default function AlarmList({ alarms: initialAlarms }) {
  // 로컬에서 읽음 즉시 반영(UX용)
  const [alarms, setAlarms] = useState(initialAlarms);

  const handleRead = async (notificationId) => {
    NotificationApi.markAsRead(notificationId);
    setAlarms((prev) =>
      prev.map((a) => (a.id === notificationId ? { ...a, isRead: true } : a))
    );
  };

  if (!alarms || alarms.length === 0)
    return (
      <div className="text-gray-400 text-center py-8">알림이 없습니다.</div>
    );

  return (
    <div>
      {alarms.map((alarm) => (
        <Alarm key={alarm.id} alarm={alarm} onRead={handleRead} />
      ))}
    </div>
  );
}
