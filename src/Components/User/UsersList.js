import Card from "@material-ui/core/Card";
import {useStyles} from "../App";
import '../App.css';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";


const UsersList = ({data}) => (
        <ul>
            {data.search.nodes.map(({id, name, login}) => {
                return (
                    <li>
                        <div key={id}>
                            <Card className={useStyles.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Button>
                                            <Link to={`/user/${login}`}>{login}</Link>
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </li>
                );
            })}
        </ul>
);

export default UsersList;