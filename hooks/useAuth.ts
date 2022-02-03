import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
  } from '@web3-react/walletconnect-connector';
import useNotification from './useNotification';
import { connectorLocalStorageKey, connectorsByName } from '../contexts/WalletContext';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  const { addNotification } = useNotification();

  const login = useCallback((connectorID) => {
    const connector = connectorsByName[connectorID];

    if (connector) {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          addNotification({
            title: 'Chain Error',
            message: 'Please check if ETH main or Ropsten network is chosen.',
            type: 'danger',
          });
          activate(connector);
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey);
          if (error instanceof NoEthereumProviderError) {
            addNotification({
              title: 'Provider Error',
              message: 'No provider was found',
              type: 'danger',
            });
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector;
              walletConnector.walletConnectProvider = null;
            }
            addNotification({
              title: 'Authorization Error',
              message: 'Please authorize to access your account',
              type: 'danger',
            });
          } else {
            addNotification({
              title: error.name,
              message: error.message,
              type: 'danger',
            });
          }
        }
      });
    } else {
      addNotification({
        title: "Can't find connector",
        message: 'The connector config is wrong',
        type: 'danger',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { login, logout: deactivate };
};

export default useAuth;
