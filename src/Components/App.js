import React from 'react';
import gql from 'graphql-tag';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
query getOrganization($login: String!){
    organization(login: $login) {
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


export const useStyles = makeStyles({
    card: {
        width: 200,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "row",
    },
    media: {
        height: 100,
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white"
    },

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


export const App = () => {
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
