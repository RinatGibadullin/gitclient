import {Mutation} from "react-apollo";
import React from "react";
import Icon from '@material-ui/core/Icon';
import gql from "graphql-tag";
import {makeStyles} from "@material-ui/core";
import {loadCSS} from "fg-loadcss";
import {useStyles} from "./Star";

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


const UnStar = ({node}) => {
    const {id} = node;
    const classes = useStyles();

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);
    return <Mutation mutation={UNSTAR_REPOSITORY} variables={{id}}>
        {unStarRepository => (
            <div className={classes.root}>
                <Icon onClick={unStarRepository} className="fas fa-star" style={{cursor: 'pointer'}}/>
            </div>
        )}
    </Mutation>
};
export default UnStar;