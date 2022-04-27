import React from 'react';
import Home from './Home';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';

// Import drizzle, @drizzle/react-plugin, and your contract artifacts.
import { Drizzle, generateStore } from "@drizzle/store";
// import { DrizzleContext } from "@drizzle/react-plugin";
import Certificate from "./artifacts/Certificate.json";

// Setup the drizzle instance.
const options = { contracts: [Certificate] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        {/* <DrizzleContext.Provider drizzle= {drizzle}> */}
          <Home drizzle= {drizzle}/>
        {/* </DrizzleContext.Provider> */}
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
