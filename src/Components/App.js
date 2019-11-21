import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import Repositories from './RepositoryList/Repositories'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import Repository from "./Repository/Repository";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
            stargazers {
                totalCount
            }
          }
        }
      }
    }
  }
`;

export const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const useStyles = makeStyles({
    card: {
        maxWidth: 100,
        margin: "auto",
        transition: "0.3s",
    }
});

export const App = () => (
    <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
        {({data: {organization}, loading}) => {
            if (loading || !organization) {
                return <div>
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
                <Router>
                    <Switch>
                        <Route path="/repositories">
                            <Repositories repositories={organization.repositories}/>
                        </Route>
                        <Route path="/:name" component={organization.repositories.edges.node}>
                            <Repository node={organization.repositories.edges.node}/>
                        </Route>
                    </Switch>
                </Router>
            );
        }}
    </Query>

);


export default App;
