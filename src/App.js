import './App.css';
import { Router } from '@reach/router';
import Title from './components/Title';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';
import SingleArticle from './components/SingleArticle';
import ErrorHandler from './components/ErrorHandler';

function App() {
  return (
    <div className='App'>
      <Title />
      <Navbar />
      <Router primary={false} className='Content'>
        <ArticleList path='/' />
        <ArticleList path='/:topic/articles' />
        <SingleArticle path='/articles/:article_id' />
        <ErrorHandler default status={404} msg={'Not found'} />
      </Router>
    </div>
  );
}

export default App;
