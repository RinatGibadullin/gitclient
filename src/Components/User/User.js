import React from 'react'
import '../App.css';
import {
    useParams
} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Query} from "react-apollo";
import Loader from "react-loader-spinner";
import RepositoryList from "../RepositoryList/RepositoryList";
import Avatar from "@material-ui/core/Avatar";
import FollowUser from "../graphql/Mutations/FollowUser";
import UnFollowUser from "../graphql/Mutations/UnFollowUser";
import {GET_USER} from "../graphql/Queries/GET_USER";

export const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        flexDirection: "row"
    },
    userInfo: {
        padding: theme.spacing(3, 2),
        margin: "20px",
        width: "300px",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    repositories: {
        width: "50%",
        padding: theme.spacing(3, 2),
    },
    item: {
        padding: theme.spacing(2, 2),
    },
    centerRow: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
        margin: "10px",
    }
}));

const User = () => {
    let {id} = useParams();
    console.log({id})
    const classes = useStyles();
    return <Query query={GET_USER} variables={{id: id}}>
        {({data: {node}, loading}) => {
            if (loading || !node) {
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
                                src={node.avatarUrl}
                                style={{width: '300px', height: '300px'}}
                        />
                        <div className={classes.item}>
                            <Typography variant="h3" component="h3">
                                {node.name}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                Login: {node.login}
                            </Typography>
                            <Typography component="p">
                                {node.bio}
                            </Typography>
                            <hr/>
                            <Typography variant="subtitle2">
                                <i className="fas fa-building fa-2x" />
                                COMPANY: {node.company}
                            </Typography>
                            <Typography variant="subtitle2">
                                <i className="fas fa-map-marker-alt fa-2x"/>
                                LOCATION: {node.location}
                            </Typography>
                            <Typography variant="subtitle2">
                                <i className="fab fa-superpowers fa-2x"></i>
                                WEBSITE: {node.websiteUrl}
                            </Typography>
                        </div>
                        {node.viewerIsFollowing ? (
                            <UnFollowUser node={node}/>
                        ) : (
                            <FollowUser node={node}/>
                        )}
                    </Paper>
                    <div className={classes.repositories}>
                        <Typography variant="h5" component="h3">
                            Repositories
                        </Typography>
                        <hr/>
                        <div>
                            <RepositoryList repositories={node.repositories}/>
                        </div>
                    </div>
                </div>
            );
        }}
    </Query>
};

export default User