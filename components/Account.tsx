import { useWeb3React } from '@web3-react/core'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import SyncIcon from '@mui/icons-material/Sync'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import { injected } from '../connectors'
import useMetaMaskOnboarding from '../hooks/useMetaMaskOnboarding'
import { formatEtherscanLink, shortenHex, parseBalance } from '../util'
import useETHBalance from '../hooks/useETHBalance'
import useConnectHandler from '../hooks/useConnectHandler'
import useAuth from '../hooks/useAuth'
import {
  connectorLocalStorageKey,
} from "../contexts/WalletContext";

type AccountProps = {
  triedToEagerConnect: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    connectBtn: {
      backgroundColor: 'blue',
    },
    walletBtn: {
      backgroundColor: '#eeebf1',
      color: '#4a4848',
      height: '50px',
      display: 'flex',
      padding: '12px 16px',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '0'
    },
    logoutBtn: {
      width: '50px',
      cursor: 'pointer',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '16px',
      borderRadius: '8px',
      justifyContent: 'space-around',
      backgroundColor: '#eeebf1',
    },
    btnGroup: {
      display: 'flex'
    }
  }),
)

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const classes = useStyles()
  const { active, error, activate, chainId, account, setError } = useWeb3React()
  const { data } = useETHBalance(account)

  const chainSupported = chainId === 1 || chainId === 3

  const { onConnectClick } = useConnectHandler()
  const {logout} = useAuth();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding()

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false)
  useEffect(() => {
    if (active || error) {
      setConnecting(false)
      stopOnboarding()
    }
  }, [active, error, stopOnboarding])

  if (error) {
    return null
  }

  if (!triedToEagerConnect) {
    return null
  }

  if (typeof account !== 'string') {
    return (
      <>
        {isWeb3Available ? (
          <Button
            className={classes.connectBtn}
            color="inherit"
            size="small"
            variant="outlined"
            onClick={onConnectClick}
          >
            {isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet'}
          </Button>
        ) : (
          <Button
            className={classes.connectBtn}
            color="inherit"
            size="small"
            variant="outlined"
            onClick={startOnboarding}
          >
            Install Metamask
          </Button>
        )}
      </>
    )
  }

  return (
    <div className={classes.btnGroup}>
      <Button
        className={classes.walletBtn}
        size="small"
        variant="outlined"
        color="inherit"
        onClick={onConnectClick}
      >
        {/* <Box> */}
        <Image src="/assets/icons/ethereum.svg" width="20" height="20" />
        {`${shortenHex(account, 4)}`}
        <SyncIcon />
        {/* </Box> */}
      </Button>

      <Button 
        className={classes.logoutBtn}
        onClick={() => {
          logout();
          window.localStorage.removeItem(connectorLocalStorageKey);
        }}
      >
        <PowerSettingsNewIcon />
      </Button>
    </div>
  )
}

export default Account
