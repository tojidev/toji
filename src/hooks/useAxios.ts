"use client";

import { useState } from "react";
import api from "@/helper/api";
import { AxiosRequestConfig } from "axios";

interface AxiosState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAxios<T = unknown>() {
  const [state, setState] = useState<AxiosState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = async (config: AxiosRequestConfig): Promise<T | null> => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await api.request<T>(config);

      setState({
        data: response.data,
        loading: false,
        error: null,
      });

      return response.data;
    } catch (err: any) {
      setState({
        data: null,
        loading: false,
        error: err?.response?.data?.message || err.message,
      });
      return null;
    }
  };

  /* ---------------- CRUD helpers ---------------- */

  // const get = (url: string, config?: AxiosRequestConfig) =>
  //   request({ url, method: "GET", ...config });

  const get = async <R = T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => request({ url, method: "GET", ...config }) as Promise<R>;

  // const post = (url: string, data?: any, config?: AxiosRequestConfig) =>
  //   request({ url, method: "POST", data, ...config });
  const post = async <R = T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> =>
    request({ url, method: "POST", data, ...config }) as Promise<R>;

  const put = async <R = T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> =>
    request({ url, method: "PUT", data, ...config }) as Promise<R>;
  // (url: string, data?: any, config?: AxiosRequestConfig) =>
  //   request({ url, method: "PUT", data, ...config });

  // const del = (url: string, config?: AxiosRequestConfig) =>
  //   request({ url, method: "DELETE", ...config });
  const del = <R = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R | null> =>
    request({ url, method: "DELETE", ...config }) as Promise<R>;

  return {
    ...state,
    get,
    post,
    put,
    del,
  };
}
