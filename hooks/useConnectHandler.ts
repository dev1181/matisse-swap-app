import { useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import useNotification from './useNotification';
import { WalletContext } from '../contexts/WalletContext';

export default function useConnectHandler() {
  const { chainId } = useWeb3React();
  const { addNotification } = useNotification();
  const { setShowWalletModal } = useContext(WalletContext);

  //toggles the wallet modal
  const onConnect = () => {
    setShowWalletModal(true);
  };

  const chainSupported = (chainId === 1 || chainId === 3);

  const onConnectClick = () => {
    if (chainId && !chainSupported) {
      addNotification({
        title: 'Chain Error',
        message: `Please check if Ethereum main or Ropsten network is chosen.`,
        type: 'danger',
      });
    }

    onConnect();
  };

  return { onConnectClick };
}
