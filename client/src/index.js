import React from 'react';
import Home from './Home';
import DrizzleApp from './DrizzleApp';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Web3 from 'web3';

import { Drizzle, generateStore } from '@drizzle/store';
import Certificate from './artifacts/Certificate.json';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp(drizzle) {
  root.render(
    <Router>
      <DrizzleApp drizzle={drizzle}>
        <Home />
      </DrizzleApp>
    </Router>
  );
}

function renderBootstrapError(message) {
  root.render(
    <div className="app-loading">
      <p>{message}</p>
    </div>
  );
}

async function bootstrap() {
  const options = { contracts: [Certificate] };

  if (typeof window.ethereum === 'undefined') {
    const drizzleStore = generateStore(options);
    const drizzle = new Drizzle(options, drizzleStore);
    renderApp(drizzle);
    return;
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    options.web3 = { customProvider: web3 };
  } catch (error) {
    console.error('Wallet connection failed:', error);
    renderBootstrapError(
      'Wallet connection failed. Unlock MetaMask, approve localhost, and refresh.'
    );
    return;
  }

  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  renderApp(drizzle);
}

bootstrap();

reportWebVitals();
