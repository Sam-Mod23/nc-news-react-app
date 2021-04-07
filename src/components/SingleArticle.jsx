import React, { Component } from 'react';
import { getArticle } from '../api/articles';
import ErrorHandler from './ErrorHandler';
import { getComments } from '../api/comments';

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
    viewComments: false,
    addComments: false,
    comments: []
  };

  componentDidMount = () => {
    const { article_id } = this.props;
    this.fetchArticle(article_id);
  };

  handleCommentsClick = (event) => {
    const { value } = event.target;
    const {
      article: { article_id },
      viewComments
    } = this.state;
    if (value === 'view' && !viewComments) {
      getComments(article_id).then((comments) => {
        this.setState({ comments, viewComments: true });
      });
    } else if (value === 'view' && viewComments) {
      this.setState({ comments: [], viewComments: false });
    }
  };

  render() {
    const { article, isLoading, err, viewComments, comments } = this.state;
    const { author, title, body, topic, votes } = article;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (err) {
      return <ErrorHandler err={err} />;
    }

    return (
      /* Article Body */
      <main>
        <h2>{title}</h2>
        <h4>
          {author} | {topic} | votes: {votes}{' '}
          <button className='button'>+</button>
        </h4>
        <section>{body}</section>

        {/* Comments buttons */}
        <button
          className='button'
          value='view'
          onClick={this.handleCommentsClick}
        >
          {viewComments ? 'Hide Comments' : 'View Comments'}
        </button>
        <button
          className='button'
          value='add'
          onClick={this.handleCommentsClick}
        >
          Add Comment
        </button>

        {/* Comments list */}
        <ul className='CommentsList'>
          {comments.map((comment) => {
            const { created_at, author, body, votes } = comment;
            return (
              <li className='CommentCard'>
                <h4>
                  {author} | {created_at}
                </h4>
                <section>{body}</section>
                <p>
                  Votes: {votes}
                  <button className='button'>+</button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticle = (article_id) => {
    getArticle(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default SingleArticle;
