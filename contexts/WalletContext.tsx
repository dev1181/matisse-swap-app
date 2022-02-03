/* eslint-disable react/prop-types */
import React, { useState, ReactNode, createContext } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

type walletContextType = {
    showWalletModal : boolean;
    setShowWalletModal : (show: boolean) => void;
}

const walletContextDefaultValues: walletContextType = {
    showWalletModal: false,
    setShowWalletModal: () => null,
};

const WalletContext = createContext<walletContextType>(walletContextDefaultValues);

type Props = {
    children: ReactNode;
};

const WalletContextProvider = ({ children }: Props) => {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  return (
    <WalletContext.Provider value={{ showWalletModal, setShowWalletModal }}>
      {children}
    </WalletContext.Provider>
  );
};

export const connectorLocalStorageKey = 'matisseSwapApp';
export const ConnectorNames = {
  MetaMask: 'MetaMask',
  WalletConnect: 'WalletConnect',
};

const injected = new InjectedConnector({ supportedChainIds: [1, 3] });
const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID,
  supportedChainIds: [1, 3],
});

export const connectorsByName = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export { WalletContext, WalletContextProvider };
