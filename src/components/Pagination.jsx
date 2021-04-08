import React from 'react';

const Pagination = (props) => {
  const { p, incrementPage, itemsLength } = props;

  return (
    <div>
      <button
        disabled={p === 1}
        onClick={() => {
          incrementPage(-1);
        }}
      >
        {'<'}
      </button>
      <span>Page: {p}</span>
      <button
        disabled={itemsLength / 10 < p}
        onClick={() => {
          incrementPage(1);
        }}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
