import * as React from 'react'
import Image from 'next/image'
import SwipeableViews from 'react-swipeable-views'
import { styled, useTheme } from '@mui/material/styles'
import {
  AppBar,
  Tabs,
  Tab as MuiTab,
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
  Container,
  useMediaQuery,
  Link
} from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { useWeb3React } from "@web3-react/core";
import {
  WalletContext,
} from "../contexts/WalletContext";
import useConnectHandler from '../hooks/useConnectHandler'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, background: '#FFFFFF',  minHeight: 640 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainBox: {
      backgroundColor: 'blue',
    },
    swapPanel: {
      backgroundColor: 'white'
    }
  }),
)

const Tab = styled(MuiTab)(() => ({
  '&.MuiTab-root': {
    background: '#B3BCD0',
    color: '#FFFFFF',
  },
  '&.Mui-selected': {
    background: '#020B44',
    color: '#FFFFFF',
  },
}))

const SwapHeader = styled(Typography)(() => ({
  color: '#000000',
  fontSize: 24,
  fontWeight: 500,
  margin: '30px 0px'
}))

const CustomSelect = styled(Select)(() => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
}))

const TokenImg = styled('img')(() => ({
  marginRight: 10
}))

const LabelText = styled(Typography)(() => ({
  color: '#525F7B',
  fontSize: 14,
  fontWeight: 'normal',
  marginBottom: 5
}))

const FlexBox = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}))

const MaxButton = styled(Button)(() => ({
  color: '#1F6DC9',
  background: 'rgba(31, 109, 201, 0.2)',
  padding: '9px 16px'
}))

const SwapButton = styled(Button)(() => ({
  padding: '18px, 32px',
  background: '#B3BCD0',
  color: '#525F7B',
  fontSize: 20,
  fontWeight: 'normal',
  marginTop: 30
}))

const RightBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(179, 188, 208, 0.1)'
}))

const Avartar = styled('div')(() => ({
  width: 96,
  height: 96,
  borderRadius: 48,
  background: 'rgba(179, 188, 208, 0.4)',
  marginBottom: 20,
}))

const VerticalSwapButton = styled(Button)(() => ({
  background: 'rgba(31, 109, 201, 0.2)',
  padding: 20,
  color: '#1F6DC9',
  width: 64,
  height: 64
}))

const RightFlexBox = styled(FlexBox)(() => ({
  marginTop: 15,
}))

export const Divider = styled('div')(() => ({
  height: 1,
  width: '100%',
  backgroundColor: '#B3BCD0',
  marginTop: 15,
}));

export default function SwapBox() {
  const theme = useTheme()
  const mobile = useMediaQuery('(max-width: 600px)');
  const [value, setValue] = React.useState(0)
  const [fromToken, setFromToken] = React.useState('eth');
  const [toToken, setToToken] = React.useState('');
  const [fromAmount, setFromAmount] = React.useState(0);
  const [toAmount, setToAmount] = React.useState(0);
  const [errorfromAmount, setErrorFromAmount] = React.useState(false);
  const [isValidFrom, setIsValidFrom] = React.useState(false);
  const [isValidTo, setIsValidTo] = React.useState(false);
  const classes = useStyles()

  const { account, chainId } = useWeb3React();
  const { setShowWalletModal } = React.useContext(WalletContext);
  const { onConnectClick } = useConnectHandler()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const handleFromChange = (e) => {
    setFromToken(e.target.value);
  }

  const handleToChange = (e) => {
    const to = e.target.value;
    if(to === fromToken)
      setToToken('');
    else 
      setToToken(e.target.value);
  }

  const handleInputFromAmount = (e) => {
    const _fromAmount = e.target.value;
    
    if(_fromAmount >= 0 && _fromAmount <= 100) {
      if(_fromAmount < 0.1) {
        setErrorFromAmount(true);
        setIsValidFrom(false);
      } else 
        setIsValidFrom(true);
      setFromAmount(_fromAmount);
    } else {
      setIsValidFrom(false);
    }

  }

  const handleInputToAmount = (e) => {
    const _toAmount = e.target.value;
    if(_toAmount >= 0 && _toAmount <= 100) {
      setToAmount(_toAmount);
      setIsValidTo(true);
    } else {
      setIsValidTo(false);
    }
  }

  const handleSwitchOption = () => {
    const _fromAmount = fromAmount;
    const _toAmount = toAmount;
    const _fromToken = fromToken;
    const _toToken = toToken;
    setFromToken(_toToken);
    setToToken(_fromToken);
    setFromAmount(_toAmount);
    setToAmount(_fromAmount);
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} sm={7}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Swap" {...a11yProps(0)} />
              <Tab label="Pool" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} sm={7}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <SwapHeader>Select a token to start swapping</SwapHeader>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <LabelText>From</LabelText>
                    <CustomSelect
                      id="token-select"
                      label="Token"
                      notched={false}
                      value={fromToken}
                      onChange={handleFromChange}
                    >
                      <MenuItem value={'eth'}><TokenImg src="/assets/icons/ethereum.svg"/> ETH</MenuItem>
                      <MenuItem value={'matic'}><TokenImg src="/assets/icons/polygon.svg"/> MATIC</MenuItem>
                      <MenuItem value={'avax'}><TokenImg src="/assets/icons/avalanche.svg"/> AVAX</MenuItem>
                    </CustomSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FlexBox>
                    <LabelText>Amount</LabelText>
                    <LabelText>{'Balance 1 ETH'}</LabelText>
                  </FlexBox>
                  <FormControl fullWidth variant="outlined">
                    <FilledInput
                      id="filled-adornment-amount"
                      endAdornment={<InputAdornment position="end"><MaxButton onClick={() => setFromAmount(100) }>Max</MaxButton></InputAdornment>}
                      aria-describedby="filled-amount-helper-text"
                      inputProps={{
                        'aria-label': 'amount',
                      }}
                      value={fromAmount}
                      onChange={handleInputFromAmount}
                      disabled={!account}
                      type="number"
                      error={errorfromAmount}
                    />
                    {!errorfromAmount && <FormHelperText id="filled-amount-helper-text">Max to use all your funds</FormHelperText>}
                    {errorfromAmount && <FormHelperText error={errorfromAmount} id="filled-amount-helper-text">Minimum amount for conversion is 0.1</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              
              <FlexBox style={{ justifyContent: 'center', margin: '50px 0px'}}>
                <VerticalSwapButton disabled={!isValidFrom || !isValidTo} onClick={handleSwitchOption}>
                  <SwapVertIcon />
                </VerticalSwapButton>
              </FlexBox>

              <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <LabelText>To</LabelText>
                    <CustomSelect
                      id="token-select"
                      label="Token"
                      notched={false}
                      value={toToken}
                      onChange={handleToChange}
                    >
                      <MenuItem value={''}> Select</MenuItem>
                      <MenuItem value={'eth'}><TokenImg src="/assets/icons/ethereum.svg"/> ETH</MenuItem>
                      <MenuItem value={'matic'}><TokenImg src="/assets/icons/polygon.svg"/> MATIC</MenuItem>
                      <MenuItem value={'avax'}><TokenImg src="/assets/icons/avalanche.svg"/> AVAX</MenuItem>
                    </CustomSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FlexBox>
                    <LabelText>Amount</LabelText>
                    <LabelText>{'Balance 1 ETH'}</LabelText>
                  </FlexBox>
                  <FormControl fullWidth variant="outlined">
                    <FilledInput
                      id="filled-adornment-amount"
                      aria-describedby="filled-amount-helper-text"
                      inputProps={{
                        'aria-label': 'amount',
                      }}
                      value={toAmount}
                      onChange={handleInputToAmount}
                      disabled={!account}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <SwapButton fullWidth>Swap</SwapButton>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Pool
            </TabPanel>
          </SwipeableViews>
        </Grid>
        <Grid item xs={12} sm={5} style={{ paddingLeft: 0, paddingTop: mobile ? 0 : 15 }}>
          <RightBox style={{ padding: 10, minHeight: 640 }}>
            <Avartar></Avartar>
            {
              account ? (
                !isValidFrom || !isValidTo ? 
                  <>
                    <Typography fontSize={20} textAlign={'center'} fontWeight={600}>
                      Hint
                    </Typography>
                    <Typography fontSize={16} textAlign={'center'} fontWeight={400} style={{ marginTop: 20, color: '#525F7B' }}>
                      You can choose any token on the list, if there is some missing you can try adding it by the <span style={{ fontWeight: 600 }}>contract address.</span>
                    </Typography>
                  </>
                  :
                  <>
                    <Typography fontSize={20} textAlign={'center'} fontWeight={600}>
                      Transaction details 
                    </Typography>
                    <RightFlexBox>
                      <LabelText>Liquidity Provider Fee</LabelText>
                      <LabelText>0.0000005 ETH</LabelText>
                    </RightFlexBox>
                    <RightFlexBox>
                      <LabelText>Price Impact</LabelText>
                      <LabelText>0.00%</LabelText>
                    </RightFlexBox>
                    <RightFlexBox>
                      <LabelText>Allowed Slippage</LabelText>
                      <LabelText>0.50%</LabelText>
                    </RightFlexBox>
                    <RightFlexBox>
                      <LabelText>Minimum Received</LabelText>
                      <LabelText>99.98 AVAX</LabelText>
                    </RightFlexBox>
                    <Divider />
                    <RightFlexBox>
                      <LabelText>
                        Output is estimated. you will receive at least 99.95 AVAX or the transaction will revert.
                      </LabelText>
                    </RightFlexBox>
                  </>
              ) : (
                <>
                  <Typography fontSize={20} textAlign={'center'} fontWeight={600}>
                    Connect your wallet
                  </Typography>
                  <Typography fontSize={16} textAlign={'center'} fontWeight={400} style={{ marginTop: 20, color: '#525F7B' }}>
                    To start using this app, your wallet needs to be connected :)
                  </Typography>
                  <Link onClick={onConnectClick} tabIndex={0} component="button">Connect wallet</Link>
                </>
              )
            }
          </RightBox>
        </Grid>
      </Grid>
    </Container>
  )
}
