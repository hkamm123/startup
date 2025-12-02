import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

class WebSocketClient {
  constructor() {
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App webSocket={new WebSocketClient()} />);