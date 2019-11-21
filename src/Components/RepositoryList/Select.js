import React from "react";
import '../App';
import Button from "@material-ui/core/Button";

const Select = ({id, isSelected, toggleSelectRepository}) => (
    <Button
        type="button"
        onClick={() => toggleSelectRepository(id, isSelected)}
    >
        {isSelected ? 'Unselect' : 'Select'}
    </Button>
);
export default Select;
