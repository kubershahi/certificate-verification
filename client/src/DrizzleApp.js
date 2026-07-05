import React, { useEffect, useState } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';

function getInitError(drizzleState) {
  if (!drizzleState) return null;
  if (drizzleState.web3?.status === 'failed') {
    return 'Could not connect to MetaMask. Unlock your wallet and refresh.';
  }
  if (drizzleState.web3?.status === 'UserDeniedAccess') {
    return 'Wallet connection was denied. Approve the connection in MetaMask and refresh.';
  }
  if (drizzleState.web3?.networkMismatch) {
    return 'Wrong network. Switch MetaMask to Sepolia and refresh.';
  }
  return null;
}

export default function DrizzleApp({ drizzle, children }) {
  const readStore = () => {
    const drizzleState = drizzle.store.getState();
    return {
      drizzle,
      drizzleState,
      initialized: Boolean(drizzleState.drizzleStatus?.initialized),
      initError: getInitError(drizzleState),
    };
  };

  const [contextValue, setContextValue] = useState(readStore);

  useEffect(() => {
    setContextValue(readStore());
    const unsubscribe = drizzle.store.subscribe(() => {
      setContextValue(readStore());
    });
    return unsubscribe;
  }, [drizzle]);

  return (
    <DrizzleContext.Context.Provider value={contextValue}>
      {children}
    </DrizzleContext.Context.Provider>
  );
}
