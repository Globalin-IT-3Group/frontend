import { useEffect } from "react";
import sseApi from "../../api/sseAPI";
import toast from "react-hot-toast";

export default function NotificationHandler() {
  useEffect(() => {
    console.log("🔔 NotificationHandler 마운트됨!");
    sseApi.subscribe(
      (event) => {
        const data = JSON.parse(event.data);
        const eventName = event.type || event.name;

        console.log("📨 알림 도착:", data, eventName);

        // ✅ 토스트 알림 표시
        toast.success(
          `🔔 [${eventName}] ${data.content || "새 알림이 도착했어요!"}`
        );
      },
      (error) => {
        console.error("❌ SSE 연결 오류", error);
      }
    );

    return () => {
      sseApi.disconnect();
    };
  }, []);

  return null;
}
