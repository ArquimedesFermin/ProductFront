import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;

const Request = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default Request;
