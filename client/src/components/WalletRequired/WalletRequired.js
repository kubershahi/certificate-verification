import React from 'react';
import './WalletRequired.scss';

const METAMASK_URL = 'https://metamask.io/download/';
const METAMASK_CHROME = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

export default function WalletRequired() {
  return (
    <div className="wallet-required">
      <div className="wallet-required__card">
        <div className="wallet-required__icon" aria-hidden="true">
          🔐
        </div>
        <h1 className="wallet-required__title">Wallet required</h1>
        <p className="wallet-required__lead">
          aCERT uses the blockchain to issue and verify academic credentials. You need a Web3 wallet to use this site.
        </p>
        <div className="wallet-required__steps">
          <p className="wallet-required__step">
            <strong>1.</strong> Install a browser wallet (we recommend MetaMask).
          </p>
          <p className="wallet-required__step">
            <strong>2.</strong> Refresh this page after installing.
          </p>
          <p className="wallet-required__step">
            <strong>3.</strong> Connect your wallet, then switch to <strong>Sepolia</strong> test network in MetaMask (free test ETH).
          </p>
        </div>
        <div className="wallet-required__actions">
          <a
            href={METAMASK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-required__btn wallet-required__btn--primary"
          >
            Install MetaMask
          </a>
          <a
            href={METAMASK_CHROME}
            target="_blank"
            rel="noopener noreferrer"
            className="wallet-required__btn wallet-required__btn--secondary"
          >
            MetaMask for Chrome
          </a>
        </div>
        <p className="wallet-required__other">
          Other wallets (Coinbase Wallet, Brave, etc.) that inject <code>window.ethereum</code> also work.
        </p>
      </div>
    </div>
  );
}
