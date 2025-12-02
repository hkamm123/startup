import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { webSocketClient } from './src/websocket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App webSocket={webSocketClient} />);