import React, { Component } from 'react';
import { getArticle } from '../api/articles';
import ErrorHandler from './ErrorHandler';

import Comments from './Comments';

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null
  };

  componentDidMount = () => {
    const { article_id } = this.props;
    this.fetchArticle(article_id);
  };

  render() {
    const { article, isLoading, err } = this.state;
    const { author, title, body, topic, votes, article_id } = article;

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
          {author} | {topic} | votes: {votes} <button className='button'>+</button>
        </h4>
        <section>{body}</section>
        <Comments article_id={article_id} username={this.props.username} />
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
