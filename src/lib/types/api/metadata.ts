export interface Metadata {
  total: number;
  page: number;
  limit: number;
}

export interface ListResponse<T> {
  data: T[];
  metadata: Metadata;
}
