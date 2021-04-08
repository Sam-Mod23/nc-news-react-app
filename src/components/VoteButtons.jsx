import React, { Component } from 'react';
import { changeVotes } from '../api/votes';
import ErrorHandler from './ErrorHandler';

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
            this.updateVotes(endpoint, -1);
          }}
          className='button'
        >
          -
        </button>
        <p style={{ padding: '13px 2px', margin: '0px' }}>{votes + voteChange}</p>
        <button
          onClick={() => {
            this.updateVotes(endpoint, 1);
          }}
          className='button'
        >
          +
        </button>
        {err ? <ErrorHandler status={503} msg={err.message}></ErrorHandler> : ''}
      </div>
    );
  }
}

export default VoteButtons;
