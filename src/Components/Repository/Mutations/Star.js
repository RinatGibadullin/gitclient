import {Mutation} from "react-apollo";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import gql from "graphql-tag";

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
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

export const useStyles = makeStyles(theme => ({
    root: {
            margin: "5px",
    },
}));

const Star = ({node}) => {
    const {id} = node;
    const classes = useStyles();
    return <Mutation mutation={STAR_REPOSITORY} variables={{id}}>
        {starRepository => (
            <i onClick={starRepository} className="far fa-star fa-2x" style={{cursor: 'pointer'}}/>
        )}
    </Mutation>
};
export default Star;