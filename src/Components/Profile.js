import React from 'react'
import './App.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Loader from "react-loader-spinner";
import {Query} from "react-apollo";
import {GET_REPOSITORIES_OF_ORGANIZATION, GET_USER} from "./App";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Repositories from "./RepositoryList/Repositories";
import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";
import AppRouter from "./AppRouter";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
}));

const UserRepositories = ({login}) => {
    return (
        <Query query={GET_REPOSITORIES_OF_ORGANIZATION} variables={{login}}>
            {({data: {user}, loading}) => {
                if (loading || !user) {
                    return <div style={{position: 'fixed', top: '50%', left: '50%'}}>
                        <Loader
                            type="MutatingDots"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs

                        />
                    </div>
                }
                return (
                    <Paper>
                        <Repositories repositories={user.repositories}/>
                    </Paper>
                );
            }}
        </Query>
    )
};

const Profile = () => {
    const classes = useStyles();
    return <Query query={GET_USER}>
        {({data: {viewer}, loading}) => {
            if (loading || !viewer) {
                return <div style={{position: 'fixed', top: '50%', left: '50%'}}>
                    <Loader
                        type="MutatingDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs

                    />
                </div>
            }
            return (
                <div>
                    <Paper className={classes.root}>
                        <Typography variant="h5" component="h3">
                            {viewer.name}
                        </Typography>
                        <Typography component="p">
                            {viewer.login}
                        </Typography>
                    </Paper>
                    <UserRepositories login={viewer.login}/>
                </div>
            );
        }}
    </Query>
};

export default Profile