import gql from "graphql-tag";

export const SEARCH_REPOSITORIES = gql`
query($name: String!){
    search(query: $name, type: REPOSITORY, first: 30) {
      edges {
        node {
          ... on Repository {
            id
            name
            createdAt 
            description 
            isArchived
            isPrivate
            url
            owner{
                login
                id
                url
            }
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