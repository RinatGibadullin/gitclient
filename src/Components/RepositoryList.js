import React from "react";
import {useStyles} from "./App";
import Select from './Select'
import Star from './Star'
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
                    <Card className={useStyles.card}>
                        <li className={rowClassName.join(' ')} key={node.id}>
                            <CardActionArea>
                                <CardContent>
                                    <Button href={node.url}>{node.name}</Button>
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
                                    <Star node={node}/>
                                </Button>
                            </CardActions>
                        </li>
                    </Card>
                </div>
        );
        })}
        </ul>
        )
            ;

            export default RepositoryList;