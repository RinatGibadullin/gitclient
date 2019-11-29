import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const style = {
    flexGrow: 1
}

const NavBar = () => {
    return (
        <div>
            <AppBar color="" position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        GitHub client
                    </Typography>
                    {/*<Button href="/repositories" color="inherit">Repositories</Button>*/}
                    <Button href="/search/repositories" color="inherit">Search repositories</Button>
                    <Button href="/search/users" color="inherit">Search users</Button>
                    <Button href="/profile" color="inherit">Profile</Button>
                    <Button href="/login" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar