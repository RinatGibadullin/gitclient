import React from 'react'
import '../App.css';
import {
    Link,
    useParams
} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";
import UnStar from "../RepositoryList/UnStar";
import Star from "../RepositoryList/Star";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center",

    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "10px"
    },
    item: {
        margin: "10px"
    }
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
      commitComments {
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
        {({data: {repositoryOwner}, loading}) => {
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
                                <Link to={`/user/${repositoryOwner.repository.owner.id}`}>
                                    {repositoryOwner.repository.owner.login}
                                </Link>
                                /
                                {repositoryOwner.repository.name}
                            </Typography>
                        </div>
                        <div className={classes.row}>
                            <Typography variant="h3" component="h3">
                                {repositoryOwner.repository.name}
                            </Typography>
                            <Button size="small" color="primary">
                                {repositoryOwner.repository.viewerHasStarred ? (
                                    <UnStar node={repositoryOwner.repository}/>
                                ) : (
                                    <Star node={repositoryOwner.repository}/>
                                )}
                            </Button>
                            <div>
                                <h3>
                                    {repositoryOwner.repository.stargazers.totalCount}
                                </h3>
                            </div>
                        </div>
                        <Typography className={classes.item} component="p">
                            {repositoryOwner.repository.description}
                        </Typography>

                        <ButtonGroup
                            color="secondary"
                            size="large"
                            aria-label="large outlined secondary button group"
                            className={classes.item}
                        >
                            <Button>{repositoryOwner.repository.forks.totalCount} forks</Button>
                            <Button>{repositoryOwner.repository.pullRequests.totalCount} pull requests</Button>
                            <Button>{repositoryOwner.repository.watchers.totalCount} watchers</Button>
                            <Button>{repositoryOwner.repository.commitComments.totalCount} commits</Button>

                        </ButtonGroup>
                    </Paper>
                </div>
            );
        }}
    </Query>
};

export default Repository