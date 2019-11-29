import Card from "@material-ui/core/Card";
import {useStyles} from "../App";
import '../App.css';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";


const SearchUsersList = ({data}) =>
    data.search.nodes.map(({id, name, login, bio, avatarUrl}) => {
        return (
            <ul>
                <li>
                    <div key={id}>
                        <Card className={useStyles.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={useStyles.media}
                                    square
                                    imageUrl={avatarUrl}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Link to={`/user/${login}`}>{login}</Link>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {bio}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </li>
            </ul>
        );
    });

export default SearchUsersList;