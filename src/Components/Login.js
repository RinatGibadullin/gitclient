import React from 'react';
import './App.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Switch} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    centerRow: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
        margin: "10px",
    }
}));


export const IsTokenValid = () => localStorage.getItem("token") && ((localStorage.getItem("token").length) === 40);

// function validateToken() {
//     return (
//         <Query query={GET_CURRENT_USER}>
//             {({data}) => {
//                 console.log(data);
//                 if (typeof data == "undefined") {
//                     localStorage.clear();
//                 }
//             }}
//         </Query>)
// }

const Login = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState("");

    const handleSubmit = () => {
        localStorage.setItem("token", value);
        console.log("set token");
        return <Switch to="/profile"/>
    };

    return (
        <div>
            {IsTokenValid() ? (
                <Paper className={classes.centerRow}>
                    <Typography variant="h3" component="h3" style={{color: "green"}}>
                        You signed in successfully. Go to profile page to see your profile.
                    </Typography>
                </Paper>
                ) :
                (<Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form}
                              noValidate
                              onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="token"
                                label="Your GitHub access token"
                                name="token"
                                autoFocus
                                onChange={event => {
                                    setValue(event.target.value);
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </Container>)
            }
        </div>)
};
export default Login;