import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getComments = (article_id) => {
  return ncApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
