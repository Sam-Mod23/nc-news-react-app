import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const changeVotes = (endpoint, inc_votes) => {
  return ncApi.patch(`${endpoint}`, { inc_votes });
};
