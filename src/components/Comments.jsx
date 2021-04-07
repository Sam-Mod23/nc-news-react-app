import React, { Component } from 'react';
import { deleteComment, getComments, postComment } from '../api/comments';
import ErrorHandler from './ErrorHandler';

class Comments extends Component {
  state = {
    err: null,
    isLoading: true,
    viewComments: false,
    viewPostComment: false,
    comments: []
  };

  handleCommentsClick = (event) => {
    const { value, id } = event.target;
    const { viewComments, viewPostComment } = this.state;
    if (value === 'get') {
      if (!viewComments) {
        this.fetchComments();
      } else {
        this.setState({ comments: [], viewComments: false });
      }
    }
    if (value === 'post') {
      viewPostComment ? this.setState({ viewPostComment: false }) : this.setState({ viewPostComment: true });
    }
    if (value === 'delete') {
      deleteComment(this.props.article_id, id).then(() => {
        this.fetchComments();
      });
    }
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.form[0];
    const { article_id, username } = this.props;

    postComment(article_id, username, value).then(() => {
      getComments(article_id).then((comments) => {
        this.setState({ comments, viewComments: true, viewPostComment: false });
      });
    });
  };

  render() {
    const { err, viewComments, viewPostComment, comments, isLoading } = this.state;

    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }
    if (err) {
      return <ErrorHandler err={err} />;
    }
    return (
      <div>
        {/* Comments buttons */}
        <button className='button' value='get' onClick={this.handleCommentsClick}>
          {viewComments ? 'Hide Comments' : 'View Comments'}
        </button>
        {viewPostComment ? (
          <form>
            <label htmlFor='body'></label>
            <input type='text' key='body' name='body'></input>
            <button onClick={this.handleCommentSubmit}>Submit</button>
          </form>
        ) : (
          ''
        )}
        <button className='button' value='post' onClick={this.handleCommentsClick}>
          {viewPostComment ? 'Cancel' : 'Post Comment'}
        </button>

        {/* Comments list */}
        <ul className='CommentsList'>
          {comments.map((comment) => {
            const { created_at, author, body, votes, comment_id } = comment;
            return (
              <li className='CommentCard' key={comment_id}>
                <h4 className='CommentHeaders'>
                  {author} | {created_at}
                </h4>
                <section>{body}</section>
                <p>
                  Votes: {votes}
                  <button className='button'>+</button>
                  {author === this.props.username ? (
                    <button onClick={this.handleCommentsClick} className='button' value='delete' id={comment_id}>
                      Delete
                    </button>
                  ) : (
                    ''
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  fetchComments = () => {
    getComments(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, viewComments: true });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default Comments;
