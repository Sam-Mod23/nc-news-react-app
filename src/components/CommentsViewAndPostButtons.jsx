import React from 'react';

const CommentsViewAndPostButtons = (props) => {
  const {
    viewComments,
    viewPostComment,
    handleCommentsClick,
    handleCommentSubmit
  } = props;
  return (
    <div>
      <button className='button' value='get' onClick={handleCommentsClick}>
        {viewComments ? 'Hide Comments' : 'View Comments'}
      </button>
      {viewPostComment && (
        <form onSubmit={handleCommentSubmit}>
          <textarea type='text' key='body' name='body' required></textarea>
          <button type='submit'>Submit</button>
        </form>
      )}
      <button className='button' value='post' onClick={handleCommentsClick}>
        {viewPostComment ? 'Cancel' : 'Post Comment'}
      </button>
    </div>
  );
};

export default CommentsViewAndPostButtons;
