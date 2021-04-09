import React from 'react';

const Title = (props) => {
  return (
    <header className='App-header'>
      <section className='login'>Logged in as: {props.username}</section>
      <h1>Welcome to NC-News!</h1>
    </header>
  );
};

export default Title;
