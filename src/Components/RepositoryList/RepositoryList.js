import React from "react";
import {useStyles} from "../App";
import Select from './Select'
import Star from './Star'
import UnStar from './UnStar'
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Repository from "../Repository/Repository";
import {Link} from "react-router-dom";

const RepositoryList = ({
                            repositories,
                            selectedRepositoryIds,
                            toggleSelectRepository,
                        }) => (
        <ul>
            {repositories.edges.map(({node}) => {
                const isSelected = selectedRepositoryIds.includes(node.id);

                const rowClassName = ['row'];

                if (isSelected) {
                    rowClassName.push('row_selected');
                }

                return (
                    <div>
                        <li className={rowClassName.join(' ')} key={node.id}>
                            <Card className={useStyles.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Button>
                                            <Link to={`/${node.name}`}>{node.name}</Link>
                                        </Button>

                                        <h2>{node.stargazers.totalCount}</h2>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <Select
                                            id={node.id}
                                            isSelected={isSelected}
                                            toggleSelectRepository={toggleSelectRepository}
                                        />
                                    </Button>
                                    <Button size="small" color="primary">
                                        {node.viewerHasStarred ? (
                                            <UnStar node={node}/>
                                        ) : (
                                            <Star node={node}/>
                                        )}
                                    </Button>
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