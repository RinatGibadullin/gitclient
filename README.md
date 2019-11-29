# react-apollo-git-client

A minimal React application using Apollo Client with GitHub's GraphQL API. On the side, React's local state is still used for local data whereas Apollo Client with its queries and mutations is used for remote data. [Read more about it here.](https://www.robinwieruch.de/react-apollo-client-example)

## Installation

* git clone
* cd react-apollo-git-client
* yarn install
* [add your own REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN in .env file](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  * scopes/permissions you need to check: admin:org, repo, user, notifications
* yarn start
* visit `http://localhost:3000`