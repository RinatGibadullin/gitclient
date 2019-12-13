import React, {useState} from "react";
import '../App.css';
import {Query} from "react-apollo";
import SearchUsersList from "./SearchUsersList";
import {makeStyles, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
import {SEARCH_USERS} from "../graphql/Queries/SEARCH_USERS";

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
            <Query query={SEARCH_USERS} variables={{user: input}}>
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
                    return <SearchUsersList data={data}/>
                }}
            </Query>
        </div>
    )
};

export default SearchUsers