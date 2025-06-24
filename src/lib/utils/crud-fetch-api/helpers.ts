import { Params, Queries } from '@/lib/types/crud-fetch-api';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const convertQueriesIntoString = (queries?: Queries) => {
  if (!queries) return '';

  const searchParams = new URLSearchParams();

  Object.entries(queries).forEach(([key, value]) => {
    switch (typeof value) {
      case 'string':
        searchParams.set(key, value);
        break;
      case 'number':
        searchParams.set(key, value.toString());
        break;
      case 'boolean':
        searchParams.set(key, value.toString());
        break;
      default:
        break;
    }
  });

  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

export const replaceUrlParams = (url: string, params?: Params) => {
  if (!params) return url;

  return Object.entries(params).reduce((acc, [key, value]) => {
    // Use regex with word boundaries to ensure exact parameter name matching
    const regex = new RegExp(`:${key}\\b`, 'g');
    return acc.replace(regex, value);
  }, url);
};

export const buildUrl = (endpoint: string, params?: Params, queries?: Queries) => {
  return `${baseUrl}${replaceUrlParams(endpoint, params)}${convertQueriesIntoString(queries)}`;
};

export function isFormData(value: unknown) {
  return value instanceof FormData;
}
