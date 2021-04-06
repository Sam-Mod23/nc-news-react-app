import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getTopics = () => {
  return ncApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};
