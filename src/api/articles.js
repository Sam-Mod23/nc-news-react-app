import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getArticles = (params) => {
  return ncApi.get('/articles', { params }).then(({ data }) => {
    return data.articles;
  });
};
