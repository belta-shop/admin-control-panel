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
