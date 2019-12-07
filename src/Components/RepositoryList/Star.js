import {Mutation} from "react-apollo";
import React from "react";
import Icon from '@material-ui/core/Icon';
import {loadCSS} from 'fg-loadcss';
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
        '& > .fa': {
            margin: theme.spacing(5),
        },
    },
}));

const Star = ({node}) => {
    const {id} = node;
    const classes = useStyles();

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);
    return <Mutation mutation={STAR_REPOSITORY} variables={{id}}>
        {starRepository => (
            <div className={classes.root}>
                <Icon onClick={starRepository} className="far fa-star" style={{cursor: 'pointer'}}/>
            </div>
        )}
    </Mutation>
};
export default Star;