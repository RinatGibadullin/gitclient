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
import gql from "graphql-tag";
import RepositoryList from "../RepositoryList/RepositoryList";
import Image from "material-ui-image";
import Avatar from "@material-ui/core/Avatar";


const GET_USER = gql`
query($id: ID!){
    node(id: $id) {
        ... on User {
            name
            login
            avatarUrl
            url
            bio
            repositories(first: 5
                        orderBy: { direction: DESC, field: STARGAZERS }) {
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
}
`;


export const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        flexDirection: "row"
    },
    userInfo: {
        padding: theme.spacing(3, 2),
        margin: "20px",
        width: "auto",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    repositories: {
        width: "50%",
        padding: theme.spacing(3, 2),
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
                        {/*<Image style={{width: '50px', height: '50px'}}*/}
                        {/*       src={node.avatarUrl}*/}
                        {/*/>*/}
                        <Avatar variant="square"
                                src={node.avatarUrl}
                                style={{width: '300px', height: '300px'}}
                        />
                        <div>
                            <Typography variant="h3" component="h3">
                                {node.name}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                {node.login}
                            </Typography>
                        </div>
                        <Typography component="p">
                            {node.bio}
                        </Typography>
                    </Paper>
                    <div className={classes.repositories}>
                        <Typography variant="h5" component="h3">
                            Repositories
                        </Typography>
                        <hr/>
                        <div >
                            <RepositoryList
                                            repositories={node.repositories}/>
                        </div>
                    </div>
                </div>
            );
        }}
    </Query>
};

export default User