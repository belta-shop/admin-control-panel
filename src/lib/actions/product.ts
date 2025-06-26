'use server';

import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '../config/api';
import { Product } from '../types/api/products';
import { DEFAULT_LIMIT } from '../config/global';
import { ListResponse } from '../types/api/metadata';
import { getData, deleteData } from '../utils/crud-fetch-api';

export type ProductListQueries = Partial<
  Record<
    | 'page'
    | 'limit'
    | 'search'
    | 'disabled'
    | 'subcategory'
    | 'brand'
    | 'tag'
    | 'offer'
    | 'employeeReadOnly',
    string
  >
>;

export async function getProductList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
  ...queries
}: ProductListQueries) {
  const res = await getData<ListResponse<Product>>('/products/staff', {
    queries: {
      page,
      limit,
      ...queries,
    },
    tags: [RevalidateTags.ProductList],
  });
  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await deleteData('/products/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.ProductList);
}
