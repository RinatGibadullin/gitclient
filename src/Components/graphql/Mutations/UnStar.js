import {Mutation} from "react-apollo";
import React from "react";
import gql from "graphql-tag";

const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        stargazers {
            totalCount
        }
      }
    }
  }
`;


const UnStar = ({node: id}) => (
    <Mutation mutation={UNSTAR_REPOSITORY} variables={{id}}>
        {unStarRepository => (
            <i onClick={unStarRepository} className="fas fa-star fa-2x" style={{cursor: 'pointer'}}/>
        )}
    </Mutation>);
export default UnStar;