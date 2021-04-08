import React from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';

export const SortDrop = (props) => {
  return (
    <DropdownButton size='sm' menuAlign='right' id='dropdown-basic-button' title='Sort By'>
      {props.options.map((option) => {
        return (
          <DropdownItem
            key={option}
            eventKey={option}
            onSelect={() => {
              props.sortArticles(option);
            }}
          >
            {option}
          </DropdownItem>
        );
      })}
    </DropdownButton>
  );
};
