import React, { Component } from 'react';
import { changeVotes } from '../api/votes';

class VoteButtons extends Component {
  state = {
    voteChange: 0,
    err: null
  };

  updateVotes = (endpoint, increment) => {
    this.setState((currState) => {
      return { voteChange: currState.voteChange + increment };
    });
    changeVotes(endpoint, increment).catch((err) => {
      this.setState((currState) => {
        return { err, voteChange: currState.voteChange - increment };
      });
    });
  };

  render() {
    const { endpoint, votes } = this.props;
    const { voteChange, err } = this.state;
    return (
      <div className='votesButtons'>
        <button
          onClick={() => {
            this.updateVotes(endpoint, 1);
          }}
          className='button'
        >
          +
        </button>
        <p>{votes + voteChange}</p>
        <button
          onClick={() => {
            this.updateVotes(endpoint, -1);
          }}
          className='button'
        >
          -
        </button>
        {err ? (
          <p style={{ fontSize: 'smaller', color: 'red' }}>
            {err.message + ' - unable to vote'}
          </p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default VoteButtons;
