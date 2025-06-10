class SseApi {
  constructor() {
    this.eventSource = null;
  }

  /**
   * SSE 연결을 시작하고, 알림 이벤트를 처리합니다.
   * @param {function} onMessage 콜백: 이벤트 수신 시 실행
   * @param {function} onError 콜백: 오류 발생 시 실행
   */
  subscribe(onMessage, onError) {
    if (this.eventSource) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource("/sse/subscribe");

    this.eventSource.onmessage = (event) => {
      console.log("[SSE - message]", event);
      onMessage?.(event);
    };

    this.eventSource.onerror = (error) => {
      console.error("[SSE - error]", error);
      onError?.(error);
    };
  }

  /**
   * SSE 연결을 닫습니다.
   */
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export default new SseApi();
