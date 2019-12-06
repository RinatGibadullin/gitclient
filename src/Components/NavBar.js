import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const style = {
    flexGrow: 1
}

const NavBar = () => {
    return (
        <div>
            <AppBar style={{ background: '#2e3b55' }} position="static">
                <Toolbar>
                    {/*<IconButton edge="start" color="inherit" aria-label="Menu">*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" style={style}>
                        GitHub client
                    </Typography>
                    {/*<Button href="/repositories" color="inherit">Repositories</Button>*/}
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
                    <Button href="/login" color="inherit">
                        <LockOpenIcon/>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar