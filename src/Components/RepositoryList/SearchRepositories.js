import React, {useState} from "react";
import '../App.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import SearchRepositoriesList from "./SearchRepositoriesList";
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';

const SEARCH_REPOSITORY = gql`
query($name: String!){
    search(query: $name, type: REPOSITORY, first: 30) {
      edges {
        node {
          ... on Repository {
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
                url
            }
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

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


const SearchRepositories = () => {
    const classes = useStyles();
    const [input, setInput] = useState("");
    return (
        <div>
            <TextField
                id="outlined-search"
                name="name"
                label="Search repositories"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={input}
                onChange={event => {
                    setInput(event.target.value);
                }}
            />
            <Query query={SEARCH_REPOSITORY} variables={{name: input}}>
                {({loading, error, data}) => {
                    if (loading) return (
                        <div style={{position: 'fixed', top: '50%', left: '50%'}}>
                            <Loader
                                type="MutatingDots"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={3000}
                            />
                        </div>
                    )
                    if (error) return <p>Something went wrong...</p>
                    return <SearchRepositoriesList data = {data}/>
                }}
            </Query>
        </div>
    )
};
export default SearchRepositories