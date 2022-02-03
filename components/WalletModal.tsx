import React, { useContext } from "react";
import Image from 'next/image'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { Box, Modal, Button, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import {
    connectorLocalStorageKey,
    ConnectorNames,
    WalletContext,
} from "../contexts/WalletContext";

import useAuth from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";
import useETHBalance from "../hooks/useETHBalance";
import DefiUiContext from "../contexts/MatisseContext";
import { formatEtherscanLink, shortenHex, parseBalance } from "../util";

const METAMASK_ICON_URL = "/assets/wallets/metamask.png";
const WALLETCONNECT_ICON_URL = "/assets/wallets/walletConnectIcon.svg";
const SUPPORTED_WALLETS = [
    {
        label: "MetaMask",
        icon: METAMASK_ICON_URL,
        connectorId: ConnectorNames.MetaMask,
        injected: true,
    },
    {
        label: "WalletConnect",
        icon: WALLETCONNECT_ICON_URL,
        connectorId: ConnectorNames.WalletConnect,
        injected: false,
    },
];

const WalletCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  background-color: rgb(211 223 250);
  border: 1px solid #101535;

  &:hover {
    cursor: pointer;
    border: 1px solid white;
  }
`;

const AccountActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  a {
    color: white;
  }
`;


const useStyles = makeStyles((theme: Theme) => createStyles({
    viewBtn: {
        color: "#3d3d48"
    },
    logOutDiv: {
        textAlign: "center"
    },
    logoutBtn: {
        margin: "24px auto 0",
        color: "#464652",
        borderColor: "#464652",
        width: "100px",
        height: "30px",
    },
    walletModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400',
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '24',
        padding: '20px'
    }
}));

const ProviderOptions = () => {
    const { login } = useAuth();
    const { setShowWalletModal } = useContext(WalletContext);

    const wallets = SUPPORTED_WALLETS.filter((option) => {
        if (option.injected) {
            return window.ethereum ? true : false;
        }

        return true;
    });

    return (
        <div>
            {wallets.map(({ label, icon, connectorId }) => {
                return (
                    <WalletCard
                        key={label}
                        onClick={() => {
                            login(connectorId);
                            window.localStorage.setItem(
                                connectorLocalStorageKey,
                                connectorId
                            );
                            setShowWalletModal(false);
                        }}
                    >
                        {label}
                        <Image src={icon} alt="option" width="24" height="24"/>
                    </WalletCard>
                );
            })}
        </div>
    );
};

const AccountInformation = () => {
    const { account, chainId } = useWeb3React();
    const { addNotification } = useNotification();
    const { logout } = useAuth();
    const { setShowWalletModal } = useContext(WalletContext);
    const { lastUpdatedTime } = useContext(DefiUiContext);

    const { data: ethBalance } = useETHBalance(account);
    const classes = useStyles();
    return (
        <div>
            {account}
            <AccountActions>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.viewBtn}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://${chainId === 3 ? "ropsten.etherscan.io" : "etherscan.io"
                        }/address/${account}`}
                >
                    View on {chainId === 3 ? "Ropsten Etherscan" : "Etherscan"}
                </Button>
            </AccountActions>
            <Typography variant="body1" gutterBottom>Your Balance : {parseBalance(ethBalance ?? 0)} eth</Typography>
            <div className={classes.logOutDiv}>
                <Button
                    variant="outlined"
                    className={classes.logoutBtn}
                    onClick={() => {
                        logout();
                        window.localStorage.removeItem(connectorLocalStorageKey);
                        setShowWalletModal(false);
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default function WalletModal() {
    const { showWalletModal, setShowWalletModal } = useContext(WalletContext);
    const { account } = useWeb3React();
    const classes = useStyles();

    return (
        <Modal
            open={showWalletModal}
            onClose={() => setShowWalletModal(false)}
        >
            <Box className={classes.walletModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {account ? "Your wallet" : "Connect Wallet"}
                </Typography>
                {!account && <ProviderOptions />}
                {account && <AccountInformation />}
            </Box>
        </Modal>
    );
}
