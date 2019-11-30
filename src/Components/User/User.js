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


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
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
                <div>
                    <Paper className={classes.root}>
                        <Typography variant="h3" component="h3">
                            {node.name}
                        </Typography>
                        <Typography variant="h5" component="h5">
                            {node.login}
                        </Typography>
                        <Typography component="p">
                            {node.bio}
                        </Typography>
                    </Paper>
                </div>
            );
        }}
    </Query>
};

export default User