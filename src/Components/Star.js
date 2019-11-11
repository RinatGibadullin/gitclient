import {Mutation} from "react-apollo";
import React from "react";
import {STAR_REPOSITORY} from './App';
import Icon from '@material-ui/core/Icon';

const Star = (node) => (
    <Mutation mutation={STAR_REPOSITORY} variables={ node.id }>
        {starRepository => (
            <Icon color={node.viewerHasStarred ? 'secondary':'disabled' } onClick={starRepository}>
                star
            </Icon>
        )}
    </Mutation>
);

export default Star;