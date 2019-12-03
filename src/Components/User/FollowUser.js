import {Mutation} from "react-apollo";
import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const FOLLOW_USER = gql`
mutation($id: ID!) {
    followUser(input: { userId: $id }) {
        user{
            id
            name
            login
            avatarUrl
            url
            bio
            viewerIsFollowing
        }
    }
}
`;

const FollowUser = ({node}) => {
    const {id} = node;
    return <Mutation mutation={FOLLOW_USER} variables={{id}}>
        {followUser => (
            <Button variant="contained" color="primary" onClick={followUser}>
                FOLLOW
            </Button>
        )}
    </Mutation>
};
export default FollowUser;