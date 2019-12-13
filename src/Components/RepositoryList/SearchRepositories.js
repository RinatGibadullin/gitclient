import React, {useState} from "react";
import '../App.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import SearchRepositoriesList from "./SearchRepositoriesList";
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {SEARCH_REPOSITORIES} from "../graphql/Queries/SEARCH_REPOSITORIES";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    centerRow: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
        margin: "10px",
    }
}));


const SearchRepositories = () => {
    const classes = useStyles();
    const [input, setInput] = useState("");
    return (
        <div>
            <div className={classes.container}>
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
            </div>
            <Query query={SEARCH_REPOSITORIES} variables={{name: input}}>
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
                    );
                    if (!data) return (
                        <Paper className={classes.centerRow}>
                            <Typography variant="h3" component="h3" style={{color: "red"}}>
                                Your token is not valid. Check please.
                            </Typography>
                        </Paper>
                    );
                    if (error) return <p>Something went wrong...</p>
                    return <SearchRepositoriesList data={data}/>
                }}
            </Query>
        </div>
    )
};
export default SearchRepositories