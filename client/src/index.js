import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider, BSCTestnet } from "@usedapp/core";

ReactDOM.render(
  <DAppProvider config={{
    networks: [BSCTestnet],
    notifications: {
      expirationPeriod: 1000, // millisec
      checkInterval: 1000
    }
  }}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
);
