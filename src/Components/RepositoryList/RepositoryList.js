import React from "react";
import {useStyles} from "../App";
import Star from '../graphql/Mutations/Star'
import UnStar from '../graphql/Mutations/UnStar'
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const RepositoryList = ({repositories}) => (
        <ul>
            {repositories.edges.map(({node}) => {
                console.log(repositories)
                return (
                    <li key={node.id}>
                        <Card className={useStyles.card}>
                            <CardContent>
                                <h2>
                                    <i className="far fa-folder"></i>
                                    <Link to={`/repository/${node.owner.login}/${node.name}`}
                                          style={{textDecoration: 'none'}}>
                                        {node.name}
                                    </Link>
                                </h2>

                            </CardContent>
                            <CardActions>
                                {node.viewerHasStarred ? (
                                    <div>
                                        <UnStar node={node}/>
                                    </div>
                                ) : (
                                    <div>
                                        <Star node={node}/>
                                    </div>
                                )}
                                <Typography variant="h5" component="h5">
                                        {node.stargazers.totalCount}
                                </Typography>
                            </CardActions>
                        </Card>
                    </li>
                );
            })}
        </ul>
    )
;

export default RepositoryList;