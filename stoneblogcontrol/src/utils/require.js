import axios from "axios";

const serve = axios.create({
  baseURL: "http://127.0.0.1:80/",
  timeout: 15000,
});
// axios.defaults.baseURL = 'http://47.119.131.221:3080/'
serve.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
export default serve;
