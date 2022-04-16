import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Import drizzle, @drizzle/react-plugin, and your contract artifacts.
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import Hello from "./artifacts/Hello.json";

// 2. Setup the drizzle instance.
const options = { contracts: [Hello] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle= {drizzle}>
      <App />
    </DrizzleContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
