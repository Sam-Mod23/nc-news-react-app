import React from 'react';

const Pagination = (props) => {
  const { p, incrementPage, itemsLength } = props;

  return (
    <div>
      <button
        // style={{ margin: '2px 2px' }}
        className='button'
        disabled={p === 1}
        onClick={() => {
          incrementPage(-1);
        }}
      >
        {'<'}
      </button>
      <span>Page: {p}</span>
      <button
        className='button'
        // style={{ margin: '2px 2px' }}
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
