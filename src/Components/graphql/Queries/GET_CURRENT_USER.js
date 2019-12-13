import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
query {
    viewer {
        name
        login
        avatarUrl
        url
        bio
        company
        location
        websiteUrl
        repositories(
            first: 5
            orderBy: { direction: DESC, field: STARGAZERS }
        ) {
            edges {
                node {
                    id
                    name
                    url
                    descriptionHTML
                    owner {
                      login
                      url
                    }
                    stargazers {
                      totalCount
                    }
                    viewerHasStarred
                    watchers {
                      totalCount
                    }
                }
            }
        }
    }
}
`;