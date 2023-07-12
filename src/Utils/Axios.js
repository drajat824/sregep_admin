import axios from "axios";
import {store} from "../store/store";

const Axios = axios.create({
  timeout: 1000 * 15,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AxiosAdmin = axios.create({
  timeout: 1000 * 15,
});

AxiosAdmin.interceptors.request.use(async (config) => {
  const { Auth } = await store.getState();
  let token = Auth?.token;
  console.log(token)

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

AxiosAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Axios, AxiosAdmin };
