import Card from "@material-ui/core/Card";
import '../App.css';
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const SearchUsersList = ({data}) => (
    <ul>
        {data.search.edges.map(({node}) => {
            return (
                <li>
                    <div key={node.id}>
                        <Card style={{display: "flex",
                            flexWrap: "nowrap",
                            }}>
                            <Avatar variant="square"
                                    src={node.avatarUrl}
                                    style={{width: '100px',
                                        height: '100px',
                                        border: "2px solid white",}}
                            />
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
        })}
    </ul>
);

export default SearchUsersList;