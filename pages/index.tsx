import { useWeb3React } from "@web3-react/core";
import { Header } from "../components/Header";
import ReactNotification from 'react-notifications-component';
import WalletModal from "../components/WalletModal";
import 'react-notifications-component/dist/theme.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import Image from "next/image";
import SwapBox from "../components/SwapBox";

const theme = createTheme();

const useStyles = makeStyles((theme: Theme) => createStyles({
  backgroundImage: {
      zIndex: -1
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Image src="/assets/background.jpg" layout="fill" className={classes.backgroundImage}/>

      <ReactNotification />

      <WalletModal />

      <Header/>

      <SwapBox />

    </ThemeProvider>
  );
}

export default Home;
