import gql from "graphql-tag";

export const GET_REPOSITORY = gql`
query ($login: String!, $repo: String!){
  repositoryOwner (login: $login) {
    repositories {
      totalCount
    }
    repository(name: $repo) {
      id
      name
      createdAt 
      description 
      isArchived
      isPrivate
      url
      owner {
         login
         id
         url
      }
      viewerHasStarred
      forks {
        totalCount
      }
      issues {
        totalCount
      }
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
      pullRequests {
        totalCount
      }
      commitComments(first: 50) {
          totalCount
          edges{
            node{
                bodyText
                createdAt
            }
          }
      }
      labels(first:10) {
        edges {
          node {
            name
          }
        }
      }
      milestones(first:10) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
}
`;