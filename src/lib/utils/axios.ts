import axios from 'axios';

import { getServerHeaders } from '../actions/server-utils';

const baseUrl = process.env.API_URL;

const cookiesInterceptor = async (req: any) => {
  const serverHeaders = await getServerHeaders();

  req.headers = { ...req.headers, ...serverHeaders };

  return req;
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(cookiesInterceptor);
