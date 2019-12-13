import gql from "graphql-tag";

export const SEARCH_USERS = gql`
query ($user: String!){
  search(query: $user, type: USER, first: 30) {
    edges{
      node {
      __typename
      ... on User {
            id
            name
            login
            avatarUrl
            url
            bio
          }
      }
    }
  }
}
`;