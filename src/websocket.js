class WebSocketClient {
  constructor() {
    console.log("WebSocketClient constructed") // TODO: remove
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveMessage('connected');
    };
    this.socket.onclose = (event) => {
      this.receiveMessage('disconnected');
    };
    this.socket.onmessage = async (msg) => {
      try {
        const message = await msg.data.text();
        this.receiveMessage(message);
      } catch {}
    };
  }

  broadcastMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  receiveMessage(message) {
    console.log('ws message received by client'); //TODO: remove
    console.log(message); //TODO: remove
  }
}

export const webSocketClient = new WebSocketClient();