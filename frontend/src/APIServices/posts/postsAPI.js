import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/posts";

export const createPostAPI = async (postData) => {

  const response = await axios.post(`${BASE_URL}/create`, {
    description: postData.description,
  });
  return response.data;

};

export const fetchAllPostsAPI = async () => {

  const response = await axios.get(BASE_URL);
  return response.data;

}

export const fetchPostAPI = async (postId) => {

  const response = await axios.get(`${BASE_URL}/${postId}`);
  return response.data;

}

export const updatePostAPI = async (postData) => {

  const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
    title: postData.title,
    description: postData.description,
  });
  return response.data;

};

export const deletePostAPI = async (postId) => {

  const response = await axios.delete(`${BASE_URL}/${postId}`);
  return response.data;

}
