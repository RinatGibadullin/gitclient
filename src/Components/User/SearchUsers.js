import React from "react";
import '../App.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import UsersList from "./UsersList";


export const SEARCH_USER = gql`
query{
  search(query: "rinatos", type: USER, first: 10) {
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
        <Query query={SEARCH_USER}>
            {({ loading, error, data }) => {
                if (loading) return <p>Good things take time....</p>
                if (error) return <p>Something went wrong...</p>

                return <UsersList data={data}/>
            }}
        </Query>
    )
};

export default SearchUsers