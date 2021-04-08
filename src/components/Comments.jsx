import React, { Component } from 'react';
import { deleteComment, getComments, postComment } from '../api/comments';
import CommentsViewAndPostButtons from './CommentsViewAndPostButtons';
import CommentsList from './CommentsList';
import ErrorHandler from './ErrorHandler';

class Comments extends Component {
  state = {
    viewCommentsErr: null,
    postCommentsErr: null,
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
      viewPostComment ? this.setState({ viewPostComment: false, postCommentsErr: null }) : this.setState({ viewPostComment: true });
    }
    if (value === 'delete') {
      deleteComment(id).then(() => {
        this.setState({ viewComments: true, isLoading: true });
        this.fetchComments();
      });
    }
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target.form[0];
    const { article_id, username } = this.props;

    postComment(article_id, username, value)
      .then((comment) => {
        this.setState((currState) => {
          return { comments: [comment, ...currState.comments], viewPostComment: false };
        });
      })
      .catch((err) => {
        this.setState({ postCommentsErr: err, viewPostComment: true });
        this.fetchComments();
      });
  };

  render() {
    const { viewCommentsErr, postCommentsErr, viewComments, viewPostComment, comments, isLoading } = this.state;
    const { username } = this.props;
    if (viewCommentsErr) {
      return <ErrorHandler err={viewCommentsErr} />;
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
        {postCommentsErr ? <ErrorHandler status={400} msg={'Incomplete fields, please try again'} /> : ''}

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
        this.setState({ viewCommentsErr: err, isLoading: false });
      });
  };
}

export default Comments;
