import React from "react";
import '../App.css';
import {Query} from "react-apollo";
import RepositoryList from "./RepositoryList";
import gql from "graphql-tag";

const SEARCH_REPOSITORY = gql`
query($name: String!){
    search(query: $name, last: 10, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
          }
        }
      }
    }
  }
`;

const SearchRepositories = () => {
    return (
        <Query query={SEARCH_REPOSITORY} variables={{name: 'gitclient'}}>
            {({ loading,...search }) => {

                if (loading || !search) {
                    return <div>Loading ...</div>;
                }

                return (
                    <RepositoryList repositories={search} />
                );
            }}
        </Query>
    )
};

export default SearchRepositories