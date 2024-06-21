import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    return Promise.reject({ message: error.message });
  }
);

export const authHeader = (token) =>
  (client.defaults.headers.common["Authorization"] = `Bearer ${token} `);

export const removeAuth = () => {
  delete client.defaults.headers.common["Authorization"];
};
