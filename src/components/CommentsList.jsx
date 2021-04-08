import React from 'react';
import VoteButtons from './VoteButtons';

const CommentsList = ({ comments, username, handleCommentsClick }) => {
  return (
    <section>
      <ul className='CommentsList'>
        {comments.map((comment) => {
          const { created_at, author, body, votes, comment_id } = comment;
          return (
            <li className='CommentCard' key={comment_id}>
              <h4 className='CommentHeaders'>
                {author} | {created_at}
              </h4>
              <section>{body}</section>
              <section>
                <VoteButtons votes={votes} endpoint={`/comments/${comment_id}`} />
                {author === username ? (
                  <button onClick={handleCommentsClick} className='button' value='delete' id={comment_id}>
                    Delete
                  </button>
                ) : (
                  ''
                )}
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CommentsList;
