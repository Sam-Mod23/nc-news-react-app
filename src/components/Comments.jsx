import React, { Component } from 'react';
import { deleteComment, getComments, postComment } from '../api/comments';
import CommentsViewAndPostButtons from './CommentsViewAndPostButtons';
import CommentsList from './CommentsList';
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
        this.setState({ viewComments: true, isLoading: true });
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
        this.setState({ viewComments: true, isLoading: true });
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
    const { username } = this.props;
    if (err) {
      return <ErrorHandler err={err} />;
    }
    return (
      <div>
        {/* Comments buttons */}
        <CommentsViewAndPostButtons
          viewComments={viewComments}
          viewPostComment={viewPostComment}
          handleCommentsClick={this.handleCommentsClick}
          handleCommentSubmit={this.handleCommentSubmit}
        />
        {/* Comments list, will display Loading if view comments has been clicked */}
        {isLoading && viewComments ? <p>Loading...</p> : ''}
        <CommentsList comments={comments} username={username} handleCommentsClick={this.handleCommentsClick} />
      </div>
    );
  }

  fetchComments = () => {
    getComments(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, viewComments: true, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default Comments;
