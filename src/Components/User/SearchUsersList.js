import Card from "@material-ui/core/Card";
import {useStyles} from "../App";
import '../App.css';
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";


const SearchUsersList = ({data}) =>
    data.search.edges.map(({node}) => {
        return (
                <li>
                    <div key={node.id}>
                        <Card className={useStyles.card}>
                            <span>
                                <Avatar variant="square"
                                        src={node.avatarUrl}
                                        style={{width: '100px', height: '100px'}}
                                />
                            </span>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Link to={`/user/${node.id}`}>{node.login}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {node.bio}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </li>
        );
    });

export default SearchUsersList;