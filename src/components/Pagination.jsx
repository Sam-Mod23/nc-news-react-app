import React from 'react';

const Pagination = (props) => {
  const { p, incrementPage, itemsLength } = props;

  return (
    <div>
      <button
        style={{ margin: '2px 2px' }}
        disabled={p === 1}
        onClick={() => {
          incrementPage(-1);
        }}
      >
        {'<'}
      </button>
      <span>Page: {p}</span>
      <button
        style={{ margin: '2px 2px' }}
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
