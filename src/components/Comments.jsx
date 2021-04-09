import React, { Component } from 'react';
import { deleteComment, getComments, postComment } from '../api/comments';
import CommentsViewAndPostButtons from './CommentsViewAndPostButtons';
import CommentsList from './CommentsList';
import ErrorHandler from './ErrorHandler';
import Pagination from './Pagination';
import { SortDrop } from './SortByDropDown';

class Comments extends Component {
  state = {
    viewCommentsErr: null,
    postCommentsErr: null,
    isLoading: true,
    viewComments: false,
    viewPostComment: false,
    comments: [],
    p: 1,
    sort_by: 'created_at',
    order: 'desc'
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { viewComments, p, sort_by, order } = this.state;
    if (
      (viewComments !== prevState.viewComments && viewComments) ||
      p !== prevState.p ||
      sort_by !== prevState.sort_by ||
      order !== prevState.order
    ) {
      this.setState({ isLoading: true });
      this.fetchComments({ p, sort_by, order });
    }
  };

  handleCommentsClick = (event) => {
    const { value, id } = event.target;
    const { viewComments, viewPostComment } = this.state;
    if (value === 'get') {
      if (!viewComments) {
        this.setState({ viewComments: true, isLoading: true });
      } else {
        this.setState({ comments: [], viewComments: false });
      }
    }
    if (value === 'post') {
      viewPostComment
        ? this.setState({ viewPostComment: false, postCommentsErr: null })
        : this.setState({ viewPostComment: true, viewComments: true });
    }
    if (value === 'delete') {
      deleteComment(id).then(() => {
        this.setState({ isLoading: true });
        this.fetchComments();
      });
    }
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target[0];
    const { article_id, username } = this.props;

    postComment(article_id, username, value)
      .then((comment) => {
        this.setState((currState) => {
          return {
            comments: [comment, ...currState.comments],
            viewPostComment: false,
            postCommentsErr: null
          };
        });
      })
      .catch((err) => {
        this.setState({ postCommentsErr: err, viewPostComment: true });
        this.fetchComments();
      });
  };

  incrementPage = (increment) => {
    this.setState((currState) => {
      return { p: currState.p + increment };
    });
  };

  sortElements = (sort_by) => {
    this.setState({ sort_by });
  };

  sortOrder = (order) => {
    this.setState({ order });
  };

  render() {
    const {
      viewCommentsErr,
      postCommentsErr,
      viewComments,
      viewPostComment,
      comments,
      isLoading,
      p,
      order,
      sort_by
    } = this.state;
    const { username } = this.props;
    const options = ['created_at', 'votes', 'author'];

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
        {postCommentsErr && <ErrorHandler err={postCommentsErr} />}

        {/* Comments list, will display Loading if view comments has been clicked */}
        {isLoading && viewComments ? <p>Loading...</p> : ''}
        {!isLoading && viewComments && (
          <section className='articlesCustom'>
            <Pagination
              p={p}
              incrementPage={this.incrementPage}
              itemsLength={comments.length}
            ></Pagination>
            <SortDrop
              options={options}
              sortElements={this.sortElements}
              sortOrder={this.sortOrder}
              order={order}
              sort_by={sort_by}
            />
          </section>
        )}
        <CommentsList
          comments={comments}
          username={username}
          handleCommentsClick={this.handleCommentsClick}
        />
        {!isLoading && viewComments && (
          <section className='articlesCustom'>
            <Pagination
              p={p}
              incrementPage={this.incrementPage}
              itemsLength={comments.length}
            ></Pagination>
          </section>
        )}
      </div>
    );
  }

  fetchComments = (params) => {
    const { article_id } = this.props;
    getComments(article_id, params)
      .then((comments) => {
        this.setState({ comments, viewComments: true, isLoading: false });
      })
      .catch((err) => {
        this.setState({ viewCommentsErr: err, isLoading: false });
      });
  };
}

export default Comments;
