import { createContext } from "react";
import { IHasChildren } from "@models";
import axios, { AxiosInstance } from "axios";

export const HttpContext = createContext<AxiosInstance | undefined>(undefined);

export const HttpProvider = ({ children }: IHasChildren) => {
  const instance = axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      //   config.headers.Authorization = `Bearer ${token}`;
      return config;
    },

    (err) => {
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      return Promise.reject(err);
    },
  );

  return (
    <HttpContext.Provider value={instance}>{children}</HttpContext.Provider>
  );
};
