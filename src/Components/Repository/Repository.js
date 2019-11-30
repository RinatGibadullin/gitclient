import React from 'react'
import '../App.css';
import {
    useParams
} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
}));


const GET_REPOSITORY = gql`
query ($login: String!, $repo: String!){
  repositoryOwner (login: $login) {
    repositories {
      totalCount
    }
    repository(name: $repo) {
      id
      name
      createdAt 
      description 
      isArchived
      isPrivate
      url
      owner {
         login
         id
         url
      }
      viewerHasStarred
      forks {
        totalCount
      }
      issues {
        totalCount
      }
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
      pullRequests {
        totalCount
      }
      labels(first:10) {
        edges {
          node {
            name
          }
        }
      }
      milestones(first:10) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
}
`;

const Repository = () => {
    let {login, name} = useParams();
    // console.log({name});
    const classes = useStyles();
    return <Query query={GET_REPOSITORY} variables={{login: login, repo: name}}>
        {({ data: {repositoryOwner}, loading}) => {
            if (loading || !repositoryOwner) {
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
                        <div>
                            <Typography component="p">
                                {repositoryOwner.repository.owner.login}/{repositoryOwner.repository.name}
                            </Typography>
                        </div>
                        <Typography variant="h3" component="h3">
                            {repositoryOwner.repository.name}
                        </Typography>
                        <Typography component="p">
                            {repositoryOwner.repository.description}
                        </Typography>
                    </Paper>
                </div>
            );
        }}
    </Query>
};

export default Repository