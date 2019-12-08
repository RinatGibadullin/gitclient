import React, {useState} from "react";
import '../App.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import SearchUsersList from "./SearchUsersList";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Loader from "react-loader-spinner";


export const SEARCH_USER = gql`
query ($user: String!){
  search(query: $user, type: USER, first: 30) {
    edges{
      node {
      __typename
      ... on User {
            id
            name
            login
            avatarUrl
            url
            bio
          }
      }
    }
  }
}
`;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        justifyContent: "center"
    },
}));


const SearchUsers = () => {
    const classes = useStyles();
    const [input, setInput] = useState("");
    return (
        <div>
            <div className={classes.container}>
                <TextField
                    id="outlined-search"
                    name="name"
                    label="Search users"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={input}
                    onChange={event => {
                        setInput(event.target.value);
                    }}
                />
            </div>
            <Query query={SEARCH_USER} variables={{user: input}}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div style={{position: 'fixed', top: '50%', left: '50%'}}>
                            <Loader
                                type="MutatingDots"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={3000} //3 secs

                            />
                        </div>
                    )
                    if (error) return <p>Something went wrong...</p>
                    return <SearchUsersList data={data}/>
                }}
            </Query>
        </div>
    )
};

export default SearchUsers