import React from "react";
import {useStyles} from "../App";
import Star from './Star'
import UnStar from './UnStar'
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const RepositoryList = ({
                            repositories
                        }) => (
        <ul>
            {repositories.edges.map(({node}) => {
                const rowClassName = ['row'];

                console.log(repositories)
                return (
                    <div>
                        <li className={rowClassName.join(' ')} key={node.id}>
                            <Card className={useStyles.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Button>
                                            <Link to={`/repository/${node.name}`}>{node.name}</Link>
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        {node.viewerHasStarred ? (
                                            <UnStar node={node}/>
                                        ) : (
                                            <Star node={node}/>
                                        )}
                                    </Button>
                                    <div>
                                        <h3>
                                            {node.stargazers.totalCount}
                                        </h3>
                                    </div>
                                </CardActions>
                            </Card>
                        </li>
                    </div>
                );
            })}
        </ul>
    )
;

export default RepositoryList;