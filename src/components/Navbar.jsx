import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getTopics } from '../api/topics';

class Navbar extends Component {
  state = {
    topics: []
  };

  componentDidMount = () => {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  };

  render() {
    return (
      <nav className='Navbar'>
        <Link to='/' className='button'>
          Home
        </Link>
        {this.state.topics.map((topic) => {
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
