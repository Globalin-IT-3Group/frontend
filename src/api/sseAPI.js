class SseApi {
  constructor() {
    this.eventSource = null;
    this.retryDelay = 3000; // 3초 후 재연결
    this.reconnectTimeout = null;
    this.listenerNames = ["friend", "study", "system", "chat"];
  }

  subscribe(onMessage, onError) {
    if (this.eventSource) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource("/sse/subscribe");

    this.listenerNames.forEach((eventName) => {
      this.eventSource.addEventListener(eventName, (event) => {
        onMessage?.(event);
      });
    });

    this.eventSource.onerror = (error) => {
      onError?.(error);
      // SSE가 끊어졌을 때 자동 재연결 로직
      if (this.reconnectTimeout == null) {
        this.reconnectTimeout = setTimeout(() => {
          this.reconnectTimeout = null;
          this.subscribe(onMessage, onError);
        }, this.retryDelay);
      }
    };
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export default new SseApi();
