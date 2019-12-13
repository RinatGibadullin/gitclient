import React, {useEffect} from 'react'
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
import * as queryString from "query-string";

const style = {
    flexGrow: 1
};

const CLIENT_ID = "a10d0a1cb9442a24b618";
const REDIRECT_URI = "http://localhost:3000";
const CLIENT_SECRET = "eee20e87b5788fccd53fbf24df5bddc41c686541";

const NavBar = () => {
    const exit = () => {
        localStorage.clear();
    };
    useEffect(() => {
        const values = queryString.parse(window.location.search);
        const code = values.code;
        console.log(code);
        if (code) {
            fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}&code=${code}`,{method: 'POST', mode: 'no-cors'})
                .then(response => response.json())
                .then(({ token }) => {
                    localStorage.setItem("token", token);
                    console.log(token);
                });
        }
    });
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
                            {/*<Button color="inherit"*/}
                            {/*        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>*/}
                            {/*    Oauth*/}
                            {/*</Button>*/}
                            <Button
                                href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
                            >
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