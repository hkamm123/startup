class WebSocketClient {
  constructor() {
    console.log("WebSocketClient constructed") // TODO: remove
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveMessage({ msg: 'connected' });
    };
    this.socket.onclose = (event) => {
      this.receiveMessage({ msg: 'disconnected' });
    };
    this.socket.onmessage = async (msg) => {
      try {
        const json = JSON.parse(await msg.data.text());
        this.receiveMessage(json);
      } catch {}
    };
  }

  broadcastMessage(message) {
    const event = { msg: message };
    this.socket.send(JSON.stringify(event));
  }

  receiveMessage(event) {
    console.log('ws message received by client'); //TODO: remove
    console.log(event); //TODO: remove
  }
}

export const webSocketClient = new WebSocketClient();