import {Mutation} from "react-apollo";
import React from "react";
import {UNSTAR_REPOSITORY} from '../App';
import Icon from '@material-ui/core/Icon';

const UnStar = ({node}) => {
    const {id} = node;
    return <Mutation mutation={UNSTAR_REPOSITORY} variables={{id}}>
        {unStarRepository => (
            <Icon color='secondary' onClick={unStarRepository}>
                star
            </Icon>
        )}
    </Mutation>
};
export default UnStar;