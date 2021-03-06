import React, { Component } from 'react';
import { getArticle } from '../api/articles';
import ErrorHandler from './ErrorHandler';

import Comments from './Comments';
import VoteButtons from './VoteButtons';

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
      <main className='Content'>
        <h2>{title}</h2>
        <h4>
          {author} | {topic}
          <VoteButtons votes={votes} endpoint={`/articles/${article_id}`} />
        </h4>
        <section className='artBody'>{body}</section>
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
