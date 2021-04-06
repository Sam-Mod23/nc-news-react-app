import './App.css';
import { Router } from '@reach/router';
import Title from './components/Title';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Title className='App-header' />
      <Navbar />
      <Router className='Content'>
        <ArticleList path='/' />
        <ArticleList path='/:topic/articles' />
      </Router>
    </div>
  );
}

export default App;
