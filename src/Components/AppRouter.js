import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react";
import Repositories from "./RepositoryList/Repositories";
import Repository from "./Repository/Repository";
import Login from "./Login";
import Profile from "./Profile";

const AppRouter = ({organization}) => {
    return(
        <div style={style}>
            <Router>
                <Switch>
                    <Route path="/repositories">
                        <Repositories repositories={organization}/>
                    </Route>
                    <Route path="/repository/:name">
                        <Repository/>
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