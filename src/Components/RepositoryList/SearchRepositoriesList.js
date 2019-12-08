import React from "react";
import {useStyles} from "../App";
import Star from '../Repository/Mutations/Star'
import UnStar from '../Repository/Mutations/UnStar'
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const SearchRepositoriesList = ({data}) =>
        data.search.edges.map(({node}) => {
            if (node.id == null) return (
                <p>No matches</p>
            )
            return (
                    <li key={node.id}>
                        <Card className={useStyles.card}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Link to={`/repository/${node.owner.login}/${node.name}`}>{node.name}</Link>
                                    </Typography>
                                </CardContent>
                            <CardActions>
                                    {node.viewerHasStarred ? (
                                        <UnStar node={node}/>
                                    ) : (
                                        <Star node={node}/>
                                    )}
                                <div>
                                    <h3>
                                        {node.stargazers.totalCount}
                                    </h3>
                                </div>
                            </CardActions>
                        </Card>
                    </li>
            );
        })
;

export default SearchRepositoriesList;