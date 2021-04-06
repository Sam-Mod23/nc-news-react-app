import React, { Component } from 'react';
import { getArticles } from '../api/articles';

class ArticleList extends Component {
  state = {
    articles: []
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
    const { articles } = this.state;
    return (
      <main>
        <ul className='articlesList'>
          {articles.map(({ article_id, author, title, topic, votes }) => {
            return (
              <li key={article_id} className='articleCard'>
                <p className='artTitle'>{title}</p>
                <p className='artAuthor'>{author}</p>
                <p className='artVotes'>
                  <button className='button'>+</button>votes: {votes}
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
      this.setState({ articles });
    });
  };
}

export default ArticleList;
