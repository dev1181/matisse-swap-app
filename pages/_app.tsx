import type { AppProps } from "next/app";

import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../getLibrary";
import theme from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';
import { WalletContextProvider } from "../contexts/WalletContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface NextWeb3AppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function NextWeb3App(props: NextWeb3AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Matisse Swap App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletContextProvider>
            <Component {...pageProps} />
          </WalletContextProvider>
        </Web3ReactProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}