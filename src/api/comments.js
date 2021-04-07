import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getComments = (article_id) => {
  return ncApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const postComment = (article_id, username, body) => {
  return ncApi.post(`/articles/${article_id}/comments`, { username, body });
};

export const deleteComment = (article_id, comment_id) => {
  return ncApi.delete(`/comments/${comment_id}`);
};
