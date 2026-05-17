const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "GET",
  });
  return handleResponse(res);
};

export const createPost = async (postData) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(postData),
  });
  return handleResponse(res);
};

export const addComment = async (postId, commentData) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comment`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(commentData),
  });
  return handleResponse(res);
};

export default { register, login, getPosts, createPost, addComment };