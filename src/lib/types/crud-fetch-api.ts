// Define types for successful and error responses
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  meta: any | undefined;
  message: string;
  status: number;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  status: number | string;
  code: unknown;
  details: unknown;
  data: unknown;
  validationErrors: unknown;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type Queries = Record<string, string | number | boolean | undefined>;
export type Params = Record<string, string>;

// Define a type for the request options
export type RequestOptions = {
  headers?: Record<string, string | string[]>;
  cache?: RequestCache;
  tags?: string[];
  queries?: Queries;
  params?: Params;
};
