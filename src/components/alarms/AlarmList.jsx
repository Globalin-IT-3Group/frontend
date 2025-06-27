import Alarm from "./Alarm";

export default function AlarmList({ alarms, onRead }) {
  if (!alarms || alarms.length === 0)
    return (
      <div className="text-gray-400 text-center py-8">알림이 없습니다.</div>
    );

  return (
    <div>
      {alarms.map((alarm) => (
        <Alarm key={alarm.id} alarm={alarm} onRead={onRead} />
      ))}
    </div>
  );
}
