import React from "react";
import RepositoryList from './RepositoryList'

export default class Repositories extends React.Component {
    state = {
        selectedRepositoryIds: [],
    };

    toggleSelectRepository = (id, isSelected) => {
        let { selectedRepositoryIds } = this.state;

        selectedRepositoryIds = isSelected
            ? selectedRepositoryIds.filter(itemId => itemId !== id)
            : selectedRepositoryIds.concat(id);

        this.setState({ selectedRepositoryIds });
    };

    render() {
        return (
            <RepositoryList
                repositories={this.props.repositories}
                selectedRepositoryIds={this.state.selectedRepositoryIds}
                toggleSelectRepository={this.toggleSelectRepository}
            />
        );
    }
}
