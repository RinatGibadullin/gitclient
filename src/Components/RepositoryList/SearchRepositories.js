import React from "react";
import '../App.css';
import {Query} from "react-apollo";
import RepositoryList from "./RepositoryList";
import gql from "graphql-tag";
import UsersList from "../User/UsersList";
import SearchRepositoriesList from "./SearchRepositoriesList";

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
            viewerHasStarred
            stargazers {
                totalCount
            }
          }
        }
      }
    }
  }
`;

const SearchRepositories = () => {
    return (
        <Query query={SEARCH_REPOSITORY} variables={{name: 'gitclient'}}>
            {({ loading, error, data }) => {
                if (loading) return <p>Good things take time....</p>
                if (error) return <p>Something went wrong...</p>

                return <SearchRepositoriesList data={data}/>
            }}
        </Query>
    )
};

export default SearchRepositories