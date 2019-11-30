import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react";
import Repository from "./Repository/Repository";
import Login from "./Login";
import Profile from "./Profile";
import SearchRepositories from "./RepositoryList/SearchRepositories";
import RepositoryList from "./RepositoryList/RepositoryList";
import SearchUsers from "./User/SearchUsers";
import User from "./User/User";

const AppRouter = ({organization}, {search}) => {
    return(
        <div style={style}>
            <Router>
                <Switch>
                    <Route path="/repositories">
                        <RepositoryList repositories={search}/>
                    </Route>
                    <Route path="/search/repositories">
                        <SearchRepositories/>
                    </Route>
                    <Route path="/search/users">
                        <SearchUsers/>
                    </Route>
                    <Route path="/repository/:login/:name">
                        <Repository/>
                    </Route>
                    <Route path="/user/:id">
                        <User/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;