import {Mutation} from "react-apollo";
import React from "react";
import {STAR_REPOSITORY} from './App';
import Icon from '@material-ui/core/Icon';

const Star = ({node}) => {
    const {viewerHasStarred,id} = node;
    return <Mutation mutation={STAR_REPOSITORY} variables={{id}}>
        {starRepository => (
            <Icon color={viewerHasStarred ? 'secondary' : 'disabled'} onClick={starRepository}>
                star
            </Icon>
        )}
    </Mutation>
};
export default Star;