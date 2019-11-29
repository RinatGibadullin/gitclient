import React from 'react'
import './App.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Loader from "react-loader-spinner";
import {Query} from "react-apollo";
import makeStyles from "@material-ui/core/styles/makeStyles";
import gql from "graphql-tag";
import RepositoryList from "./RepositoryList/RepositoryList";

const GET_CURRENT_USER = gql`
query {
    viewer {
        name
        login
        avatarUrl
        url
        bio
        repositories(
            first: 5
            orderBy: { direction: DESC, field: STARGAZERS }
        ) {
            edges {
                node {
                    id
                    name
                    url
                    descriptionHTML
                    owner {
                      login
                      url
                    }
                    stargazers {
                      totalCount
                    }
                    viewerHasStarred
                    watchers {
                      totalCount
                    }
                }
            }
        }
    }
}
`;

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
}));

const Profile = () => {
    const classes = useStyles();
    return <Query query={GET_CURRENT_USER}>
        {({ data, loading}) => {
            const { viewer } = data;
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
                        <Typography component="p">
                            {viewer.bio}
                        </Typography>
                    </Paper>
                    <hr/>
                    <Typography variant="h5" component="h3">
                        Repositories
                    </Typography>
                    <RepositoryList repositories={viewer.repositories}/>
                </div>
            );
        }}
    </Query>
};

export default Profile