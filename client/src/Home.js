import './Home.scss';
import { Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { About, Header } from './container';
import { Navbar } from './components';
import Login from './components/About/about';
import Upload from './components/Upload/Upload';
import Verify from './components/Verify/Verify';
import Share from './components/Share/Share';
import WalletRequired from './components/WalletRequired/WalletRequired';
import { DrizzleContext } from '@drizzle/react-plugin';

function hasWalletProvider() {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

function HomeRoutes({ drizzle, drizzleState }) {
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/upload">
          <Upload drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
        <Route exact path="/verify">
          <Verify drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
        <Route exact path="/share">
          <Share drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
        <Route exact path="/about">
          <Login drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
        <Route path="/">
          <Header />
          <About />
        </Route>
      </Switch>
    </div>
  );
}

function HomeContent({ drizzleContext }) {
  const { drizzle, drizzleState, initialized, initError } = drizzleContext;
  const [walletAvailable, setWalletAvailable] = useState(hasWalletProvider);
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  useEffect(() => {
    setWalletAvailable(hasWalletProvider());
  }, []);

  useEffect(() => {
    if (!walletAvailable || initialized) {
      setLoadTimedOut(false);
      return undefined;
    }

    const timer = setTimeout(() => setLoadTimedOut(true), 15000);
    return () => clearTimeout(timer);
  }, [walletAvailable, initialized]);

  if (!walletAvailable) {
    return <WalletRequired />;
  }

  if (initError) {
    return (
      <div className="app-loading">
        <p>{initError}</p>
      </div>
    );
  }

  if (!initialized) {
    if (loadTimedOut) {
      return (
        <div className="app-loading">
          <p>Still connecting to your wallet...</p>
          <p>Open MetaMask, unlock it, switch to Sepolia, then refresh this page.</p>
        </div>
      );
    }
    return <div className="app-loading">Loading...</div>;
  }

  return <HomeRoutes drizzle={drizzle} drizzleState={drizzleState} />;
}

export default function Home() {
  return (
    <DrizzleContext.Consumer>
      {(drizzleContext) => <HomeContent drizzleContext={drizzleContext} />}
    </DrizzleContext.Consumer>
  );
}
