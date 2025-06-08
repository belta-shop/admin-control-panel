import axios from 'axios';

import { getServerHeaders } from '../actions/server-utils';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const cookiesInterceptor = async (req: any) => {
  const serverHeaders = await getServerHeaders();
  req.headers = serverHeaders;

  return req;
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(cookiesInterceptor);

export class ResponseError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      new ResponseError(
        error.response.data.error ?? error.response.data.message,
        error.response.status
      )
    );
  }
);
