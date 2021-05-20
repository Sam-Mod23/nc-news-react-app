import React, { Component } from 'react';
import { getArticles, deleteArticle } from '../api/articles';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import { SortDrop } from './SortByDropDown';
import Pagination from './Pagination';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    p: 1,
    sort_by: 'created_at',
    order: 'desc',
    stateTopic: undefined
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { topic } = this.props;
    const { p, sort_by, order, stateTopic } = this.state;
    if (
      topic !== prevProps.topic ||
      topic !== stateTopic ||
      p !== prevState.p ||
      sort_by !== prevState.sort_by ||
      order !== prevState.order
    ) {
      this.setState({ stateTopic: topic });
      this.fetchArticles({ topic, p, sort_by, order });
    }
  };

  sortElements = (sort_by) => {
    this.setState({ sort_by });
  };

  sortOrder = (order) => {
    this.setState({ order });
  };

  incrementPage = (increment) => {
    this.setState((currState) => {
      return { p: currState.p + increment };
    });
  };

  handleDeleteClick = (event) => {
    const { article_id } = event.target.id;
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(article_id).then(() => {
        this.fetchArticles();
      });
    }
  };

  render() {
    const { articles, isLoading, p, order, sort_by } = this.state;
    const options = ['created_at', 'votes', 'author'];
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <main>
        <section className='articlesCustom'>
          <Pagination
            p={p}
            incrementPage={this.incrementPage}
            itemsLength={articles.length}
          ></Pagination>
          <SortDrop
            options={options}
            sortElements={this.sortElements}
            sortOrder={this.sortOrder}
            order={order}
            sort_by={sort_by}
          />
        </section>

        <ul className='articlesList'>
          {articles.map(
            ({ article_id, author, title, topic, votes, created_at }) => {
              return (
                <li key={article_id} className='articleCard'>
                  <Link to={`/articles/${article_id}`} className='artTitle'>
                    {title}
                  </Link>
                  <section className='artAuthor'>
                    <p>{author}</p>
                    <p>{created_at.slice(0, 16).replace('T', ' ')}</p>
                  </section>
                  <section className='artVotes'>
                    <VoteButtons
                      votes={votes}
                      endpoint={`/articles/${article_id}`}
                    />
                  </section>
                  {this.props.username === author && (
                    <section className='deleteArticle'>
                      <button
                        className='button'
                        id={article_id}
                        onClick={this.handleDeleteClick}
                      >
                        X
                      </button>
                    </section>
                  )}
                </li>
              );
            }
          )}
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
