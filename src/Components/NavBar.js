import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {IsTokenValid} from "./Login";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const style = {
    flexGrow: 1
};

const CLIENT_ID = "a10d0a1cb9442a24b618";
const REDIRECT_URI = "http://localhost:3000";

const NavBar = () => {
    const exit = () => {
        localStorage.clear();
    };
    return (
        <div>
            <AppBar style={{background: '#2e3b55'}} position="static">
                <Toolbar>
                    {/*<IconButton edge="start" color="inherit" aria-label="Menu">*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" style={style}>
                        GitHub client
                    </Typography>
                    {IsTokenValid() ? (
                        <div>
                            <Button href="/search/repositories" color="inherit">
                                <PageviewRoundedIcon/>
                                Search repositories
                            </Button>
                            <Button href="/search/users" color="inherit">
                                <SearchIcon/>
                                Search users
                            </Button>
                            <Button href="/profile" color="inherit">
                                <AccountBoxIcon/>
                                Profile
                            </Button>
                            <Button color='inherit' href="/" onClick={exit}>
                                <ExitToAppIcon/>
                                {/*<i className="fas fa-door-open fa-2x"></i>*/}
                                Exit
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button href="/login" color="inherit">
                                <LockOpenIcon/>
                                Login
                            </Button>
                            <Button color="inherit"
                                    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
                                Oauth
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar