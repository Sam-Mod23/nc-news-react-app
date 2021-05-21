import React from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';

export const SortDrop = (props) => {
  return (
    <div className='sortElements'>
      <DropdownButton
        size='sm'
        menuAlign='right'
        id='dropdown-basic-button'
        title={`Sort By: ${props.sort_by}`}
      >
        {props.options.map((option) => {
          return (
            <DropdownItem
              key={option}
              eventKey={option}
              onSelect={() => {
                props.sortElements(option);
              }}
            >
              {option}
            </DropdownItem>
          );
        })}
      </DropdownButton>
      <span>
        <button
          className='button'
          onClick={() => {
            props.sortOrder(props.order === 'desc' ? 'asc' : 'desc');
          }}
        >
          {props.order === 'desc' ? '↑' : '↓'}
        </button>
      </span>
    </div>
  );
};
