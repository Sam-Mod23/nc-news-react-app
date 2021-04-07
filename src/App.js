import './App.css';
import React, { Component } from 'react';
import { Router } from '@reach/router';
import Title from './components/Title';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ErrorHandler from './components/ErrorHandler';

class App extends Component {
  state = {
    username: 'jessjelly'
  };
  render() {
    return (
      <div className='App'>
        <Title />
        <Navbar />
        <Router primary={false} className='Content'>
          <ArticleList path='/' username={this.state.username} />
          <ArticleList path='/:topic/articles' username={this.state.username} />
          <SingleArticle path='/articles/:article_id' username={this.state.username} />
          <ErrorHandler default status={404} msg={'Not found'} />
        </Router>
      </div>
    );
  }
}

export default App;
