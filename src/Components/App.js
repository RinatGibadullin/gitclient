import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";

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
    return <Query query={GET_REPOSITORIES_OF_ORGANIZATION} variables={{login: "Adelina609"}}>
        {({data: {user}, loading}) => {
            if (loading || !user) {
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
                    <NavBar/>
                    <Container>
                        <AppRouter organization={user.repositories}/>
                    </Container>
                </div>
            );
        }}
    </Query>
};


export default App;
