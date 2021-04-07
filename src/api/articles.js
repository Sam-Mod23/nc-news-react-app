import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getArticles = (params) => {
  return ncApi.get('/articles', { params }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (article_id) => {
  return ncApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
