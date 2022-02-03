import Image from 'next/image';

import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";
import useEagerConnect from "../hooks/useEagerConnect";
import Account from "./Account";

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
        height: "64px",
        backgroundColor: 'transparent',
        color: 'white',
        boxShadow: 'none',
    },
    header: {
        justifyContent: 'space-between'
    }
}));

export const Header = () => {
    const classes = useStyles();
    const triedToEagerConnect = useEagerConnect();

    return (
        <AppBar position="static" className={classes.appBar} >
            <Toolbar className={classes.header}>
                <Image src="/assets/logo.svg" width="64" height="32"/>
                <Account triedToEagerConnect={triedToEagerConnect} />
            </Toolbar>
        </AppBar>
    );
}