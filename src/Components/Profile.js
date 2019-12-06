import React from 'react'
import './App.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Loader from "react-loader-spinner";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import RepositoryList from "./RepositoryList/RepositoryList";
import {useStyles} from "./User/User";
import Avatar from "@material-ui/core/Avatar";

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


const Profile = () => {
    const classes = useStyles();
    return <Query query={GET_CURRENT_USER}>
        {({data, loading}) => {
            const {viewer} = data;
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
                <div className={classes.root}>
                    <Paper className={classes.userInfo}>
                        <Avatar variant="square"
                                src={viewer.avatarUrl}
                                style={{width: '300px', height: '300px'}}
                        />
                        <div>
                            <Typography variant="h3" component="h3">
                                {viewer.name}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                {viewer.login}
                            </Typography>
                        </div>
                        <Typography component="p">
                            {viewer.bio}
                        </Typography>
                    </Paper>
                    <div className={classes.repositories}>
                        <Typography variant="h5" component="h3">
                            Repositories
                        </Typography>
                        <hr/>
                        <div>
                            <RepositoryList
                                repositories={viewer.repositories}/>
                        </div>
                    </div>
                </div>
            );
        }}
    </Query>
};

export default Profile