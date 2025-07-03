import Alarm from "./Alarm";
import NotificationApi from "../../api/notificationAPI";

export default function AlarmList({ alarms, onRead, onDeleteAlarm }) {
  if (!alarms || alarms.length === 0)
    return (
      <div className="text-gray-400 text-center py-8">알림이 없습니다.</div>
    );

  const handleDelete = async (notificationId) => {
    try {
      await NotificationApi.deleteNotification(notificationId);
      if (onDeleteAlarm) {
        onDeleteAlarm(notificationId); // 상태 갱신
      }
    } catch (e) {
      alert(`알림 삭제 실패: ${e.response.data}`);
    }
  };

  return (
    <div>
      {alarms.map((alarm) => (
        <Alarm
          key={alarm.id}
          alarm={alarm}
          onRead={onRead}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
