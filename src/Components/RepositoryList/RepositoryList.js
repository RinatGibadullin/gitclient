import React from "react";
import {useStyles} from "../App";
import Star from './Star'
import UnStar from './UnStar'
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";

const RepositoryList = ({
                            repositories
                        }) => (
        <ul>
            {repositories.edges.map(({node}) => {
                console.log(repositories)
                return (
                    <li key={node.id}>
                        <Card className={useStyles.card}>
                            <CardContent>
                                <h2>
                                    <Link to={`/repository/${node.owner.login}/${node.name}`}
                                          style={{textDecoration: 'none'}}>
                                        {node.name}
                                    </Link>
                                </h2>

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
            })}
        </ul>
    )
;

export default RepositoryList;