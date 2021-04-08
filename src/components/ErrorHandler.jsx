import React from 'react';

const ErrorHandler = (props) => {
  // if error from Api, destructured to get status and msg
  if (props.err) {
    const {
      response: {
        status,
        data: { msg }
      }
    } = props.err;
    return <p style={{ fontSize: 'smaller', color: 'red' }}>{`${status} - ${msg}`}</p>;
  } else {
    //if error from Router handler
    const { status, msg } = props;
    return <p style={{ fontSize: 'smaller', color: 'red' }}>{`${status} - ${msg}`}</p>;
  }
};

export default ErrorHandler;
