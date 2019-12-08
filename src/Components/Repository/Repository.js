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
import UnStar from "./Mutations/UnStar";
import Star from "./Mutations/Star";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CommitsList from "./CommitsList";

export const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
        margin: "10px",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "10px",
    },
    item: {
        margin: "10px",
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
      commitComments(first: 50) {
          totalCount
          edges{
            node{
                bodyText
                createdAt
            }
          }
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
                        <div className={classes.item}>
                            <Typography component="p">
                                <Link to={`/user/${repositoryOwner.repository.owner.id}`}>
                                    {repositoryOwner.repository.owner.login}
                                </Link>
                                /
                                {repositoryOwner.repository.name}
                            </Typography>
                        </div>
                        <div className={classes.row}>
                            <Typography variant="h1" component="h2" className={classes.item}>
                                {repositoryOwner.repository.name}
                            </Typography>
                            {repositoryOwner.repository.viewerHasStarred ? (
                                <div className={classes.item}>
                                    <UnStar node={repositoryOwner.repository}/>
                                </div>
                            ) : (
                                <div className={classes.item}>
                                    <Star node={repositoryOwner.repository}/>
                                </div>
                            )}
                            <Typography variant="h5" component="h5" className={classes.item}>
                                Stars: {repositoryOwner.repository.stargazers.totalCount}
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.item}>
                                Watchers: {repositoryOwner.repository.watchers.totalCount}
                            </Typography>
                        </div>
                        <Typography className={classes.item} component="p">
                            {repositoryOwner.repository.description}
                        </Typography>
                    </Paper>
                    <Typography variant="h5" component="h3">
                        Commits
                    </Typography>
                    <hr/>
                    <CommitsList commits={repositoryOwner.repository.commitComments}/>
                </div>
            );
        }}
    </Query>
};

export default Repository