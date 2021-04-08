import React, { Component } from 'react';
import { getArticles } from '../api/articles';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import { SortDrop } from './SortByDropDown';
import Pagination from './Pagination';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    p: 1,
    sort_by: 'created_at'
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps) => {
    const { topic } = this.props;
    const { p, sort_by } = this.state;
    if (topic !== prevProps.topic || p !== prevProps.p || sort_by !== prevProps.sort_by) {
      this.fetchArticles({ topic, p, sort_by });
    }
  };

  sortArticles = (sort_by) => {
    this.setState({ sort_by });
  };

  incrementPage = (increment) => {
    this.setState((currState) => {
      return { p: currState.p + increment };
    });
  };

  render() {
    const { articles, isLoading, p } = this.state;
    const options = ['created_at', 'votes', 'author'];
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <main>
        <section className='articlesCustom'>
          <Pagination p={p} incrementPage={this.incrementPage} itemsLength={articles.length}></Pagination>
          <SortDrop options={options} sortArticles={this.sortArticles} />
        </section>

        <ul className='articlesList'>
          {articles.map(({ article_id, author, title, topic, votes }) => {
            return (
              <li key={article_id} className='articleCard'>
                <Link to={`/articles/${article_id}`} className='artTitle'>
                  {title}
                </Link>
                <p className='artAuthor'>{author}</p>
                <section className='artVotes'>
                  <VoteButtons votes={votes} endpoint={`/articles/${article_id}`} />
                </section>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticles = (params) => {
    getArticles(params).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
