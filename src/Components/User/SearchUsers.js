import React from "react";
import '../App.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import UsersList from "./UsersList";

const SEARCH_USER = gql`
query($user: String!) {
  search(query: $user, type: USER, first: 10) {
    nodes {
      ... on User {
        name
        login
        avatarUrl
        url
        bio
      }
    }
  }
}
`;

const SearchUsers = () => {
    return (
        <Query query={SEARCH_USER} variables={"rinat"}>
            {({ loading,...search })  => {
                return (
                    <UsersList users={search} />
                );
            }}
        </Query>
    )
};

export default SearchUsers