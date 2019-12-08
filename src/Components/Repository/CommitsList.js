import React from "react";
import {Card, CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const CommitsList = ({commits}) => (
        <ul>
            {commits.edges.map(({node}) => {
                console.log(commits)
                return (
                    <li key={node.id}>
                        <Card>
                            <CardContent>
                                <div style={{display: "flex"}}>
                                    <Typography variant="overline" gutterBottom>
                                        {node.createdAt}
                                    </Typography>
                                </div>
                                <Typography variant="subtitle2">
                                    {node.bodyText}
                                </Typography>
                            </CardContent>
                        </Card>
                    </li>
                );
            })}
        </ul>
    )
;

export default CommitsList;