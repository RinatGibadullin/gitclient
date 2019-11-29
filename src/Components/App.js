import React from 'react';
import gql from 'graphql-tag';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";
import Query from "react-apollo/Query";

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
query User($login: String!){
    user(login: $login) {
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

export const SEARCH_REPOSITORY_FUCK = gql`
query {
 search(query:"git", type:REPOSITORY, first:20){
  repositoryCount
  edges{
   node{
    ... on Repository{
     id
     name
     createdAt 
     description 
     isArchived
     isPrivate
     url
     owner{
      login
      id
      __typename
      url
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
        stargazers {
            totalCount
        }
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
        stargazers {
            totalCount
        }
      }
    }
  }
`;

export const GET_USER = gql`
    {
      viewer {
        login
        name
      }
    }
`;

export const useStyles = makeStyles({
    card: {
        maxWidth: 100,
        margin: "auto",
        transition: "0.3s",
        textAlign: "center"
    }
});


export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        htmlFontSize: 10
    },
});

// function useQuery() {
//     return new URLSearchParams(window.location().search);
// }

export const App = () => {
    // const queryParams = useQuery();
    // const { loading, error, data } = useQuery(SEARCH_REPOSITORY, {
    //     variables: { language: 'english' },
    // });
    return (
        <div>
            <NavBar/>
            <Container>
                <AppRouter/>
            </Container>
        </div>
    );
};


export default App;
