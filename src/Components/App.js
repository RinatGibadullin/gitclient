import React from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import Repositories from './Repositories'
import Card from "@material-ui/core/Card";

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

export const useStyles = makeStyles({
    card: {
        maxWidth: 100,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    }
});

export const App = () => (
    <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
        {({data: {organization}, loading}) => {
            if (loading || !organization) {
                return <div>Loading ...</div>;
            }

            return (
                <Repositories repositories={organization.repositories}/>
            );
        }}
    </Query>
);

export default App;
