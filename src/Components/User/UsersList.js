import Card from "@material-ui/core/Card";
import {useStyles} from "../App";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";

const UsersList = ({users}) => {
    console.log(users);
    return (
        <ul>
            {users.map(({nodes}) => {
                const rowClassName = ['row'];
                return (
                    <div>
                        <li className={rowClassName.join(' ')} key={nodes.id}>
                            <Card className={useStyles.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Button>
                                            <Link to={`/repository/${nodes.name}`}>{nodes.name}</Link>
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </li>
                    </div>
                );
            })}
        </ul>
    )
};

    export default UsersList;