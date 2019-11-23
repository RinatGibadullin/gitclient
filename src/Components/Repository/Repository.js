import React from 'react'
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

const Repository = () => {
    let {name} = useParams();
    console.log({name});
    return (
        <div>
            <h1>{name}</h1>
            <h2>Repository info</h2>
        </div>

    )
};

export default Repository