import {Mutation} from "react-apollo";
import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const FOLLOW_USER = gql`
mutation($id: ID!) {
    unfollowUser(input: { userId: $id }) {
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

const UnFollowUser = ({node}) => {
    const {id} = node;
    return <Mutation mutation={FOLLOW_USER} variables={{id}}>
        {followUser => (
            <Button variant="outlined" color="secondary" onClick={followUser}>
                UNFOLLOW
            </Button>
        )}
    </Mutation>
};
export default UnFollowUser;