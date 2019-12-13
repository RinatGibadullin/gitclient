import React from 'react'
import '../App.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Loader from "react-loader-spinner";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import RepositoryList from "../RepositoryList/RepositoryList";
import {useStyles} from "./User";
import Avatar from "@material-ui/core/Avatar";
import {IsTokenValid} from "../Login";

export const GET_CURRENT_USER = gql`
query {
    viewer {
        name
        login
        avatarUrl
        url
        bio
        company
        location
        websiteUrl
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
    return (<div>
        {IsTokenValid() ? (
                <Query query={GET_CURRENT_USER}>
                    {({data, loading}) => {
                        if (!data) return (
                            <Paper className={classes.centerRow}>
                                <Typography variant="h3" component="h3" style={{color: "red"}}>
                                    Your token is not valid. Check please.
                                </Typography>
                            </Paper>
                        );

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
                                    <div className={classes.item}>
                                        <Typography variant="h3" component="h3">
                                            {viewer.name}
                                        </Typography>
                                        <Typography variant="h5" component="h5">
                                            Login: {viewer.login}
                                        </Typography>
                                        <Typography component="p">
                                            {viewer.bio}
                                        </Typography>
                                        <hr/>
                                        <Typography variant="subtitle2">
                                            <i className="fas fa-building fa-2x"/>
                                            COMPANY: {viewer.company}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <i className="fas fa-map-marker-alt fa-2x"/>
                                            LOCATION: {viewer.location}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <i className="fab fa-superpowers fa-2x"></i>
                                            WEBSITE: {viewer.websiteUrl}
                                        </Typography>
                                    </div>
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
                </Query>) :
            (
                <Paper className={classes.centerRow} style={{backgroundColor: "#FF9E71"}}>
                    <Typography variant="h3" component="h3" >
                        To see this page you need to sign in!
                    </Typography>
                </Paper>
            )}
    </div>);
};

export default Profile;