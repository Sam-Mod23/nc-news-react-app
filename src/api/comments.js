import axios from 'axios';

const ncApi = axios.create({
  baseURL: 'https://be-nc-news-sjmh.herokuapp.com/api'
});

export const getComments = (article_id, params) => {
  return ncApi.get(`/articles/${article_id}/comments`, { params }).then(({ data }) => {
    return data.comments;
  });
};

export const postComment = (article_id, username, body) => {
  return ncApi.post(`/articles/${article_id}/comments`, { username, body }).then(({ data }) => {
    return data.comment;
  });
};

export const deleteComment = (comment_id) => {
  return ncApi.delete(`/comments/${comment_id}`);
};
