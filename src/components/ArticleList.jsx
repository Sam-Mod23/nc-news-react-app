import React, { Component } from 'react';
import { getArticles } from '../api/articles';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps) => {
    const { topic } = this.props;
    if (topic !== prevProps.topic) {
      this.fetchArticles(this.props);
    }
  };

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <main>
        <ul className='articlesList'>
          {articles.map(({ article_id, author, title, topic, votes }) => {
            return (
              <li key={article_id} className='articleCard'>
                <Link to={`/articles/${article_id}`} className='artTitle'>
                  {title}
                </Link>
                <p className='artAuthor'>{author}</p>
                <p className='artVotes'>
                  <VoteButtons
                    votes={votes}
                    endpoint={`/articles/${article_id}`}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticles = (url) => {
    getArticles(url).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
