import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getTopics } from '../api/topics';

class Navbar extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount = () => {
    getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <nav className='Navbar'>
        <Link to='/' className='button'>
          Home
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={`${topic.slug}/articles`}
              key={`${topic.slug}`}
              className='button'
            >{`${topic.slug}`}</Link>
          );
        })}
      </nav>
    );
  }
}

export default Navbar;
