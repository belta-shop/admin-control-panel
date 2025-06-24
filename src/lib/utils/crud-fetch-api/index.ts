'use server';

import { cookies } from 'next/headers';

import { buildUrl } from './helpers';
import { isFormData } from './helpers';
import { routing } from '../../i18n/routing';
import { COOKIES_KEYS } from '../../config/global';
import { ApiResponse, RequestOptions, ApiErrorResponse } from '../../types/crud-fetch-api';

// generic function to make API requests
async function apiRequest<TResponse, TBody = undefined>(
  endpoint: string,
  method: string,
  body?: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> {
  const url = buildUrl(endpoint, options.params, options.queries);
  const cookie = await cookies();

  const token = cookie.get(COOKIES_KEYS.AccessToken)?.value;
  const lang = cookie.get(COOKIES_KEYS.Locale)?.value || routing.defaultLocale;

  const headers = {
    ...(!isFormData(body) && {
      'Content-Type': 'application/json',
    }),
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    'Accept-Language': lang,
    ...options.headers,
  };

  let reqBody;
  if (body) {
    reqBody = isFormData(body) ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: reqBody,
      cache: options.cache,
      next: { tags: options.tags },
    });

    // IF THE RETURN VALUR IS NOTHING BUT A SUCCESS REQUEST (ex: edit/delete requests);
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {
        success: true,
        data: {} as TResponse, // return an empty object or a default value
        meta: undefined,
        message: 'Success',
        status: response.status,
      };
    }

    const responseData = await response.json();

    // Response check after parsing so i can get the error message
    if (!response.ok) {
      const errMsg = Array.isArray(responseData?.error)
        ? responseData?.error.join(' | ')
        : responseData?.error ?? responseData?.message;
      const resCode = responseData?.code || null;
      const resDetails = responseData?.details || null;
      const resData = responseData?.data || {};
      const resVErrors = responseData?.validationErrors || null;
      return errorObject(errMsg, response.status, resCode, resDetails, resData, resVErrors);
    }

    return {
      success: true,
      data: responseData,
      meta: responseData.meta,
      message: responseData.message || 'Success',
      status: response.status,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'unexpected_error';
    return errorObject(errMsg, 500);
  }
}

// CRUD functions
export async function getData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'GET', undefined, options);
}

export async function postData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, 'POST', data, options);
}

export async function putData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, 'PUT', data, options);
}

export async function patchData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, 'PATCH', data, options);
}

export async function deleteData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'DELETE', undefined, options);
}

const errorObject = (
  error: string = '',
  status: string | number = '',
  code: unknown = null,
  details: unknown = null,
  data: unknown = {},
  validationErrors: unknown = null
): ApiErrorResponse => ({
  success: false,
  error,
  status,
  code,
  details,
  data,
  validationErrors,
});
