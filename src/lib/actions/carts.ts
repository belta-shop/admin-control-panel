import { DEFAULT_LIMIT } from '../config/global';
import { getData } from '../utils/crud-fetch-api';
import { ListResponse } from '../types/api/metadata';
import { Cart, CartDetails } from '../types/api/carts';

export async function getCartList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
}: {
  page?: string;
  limit?: string;
}) {
  const res = await getData<ListResponse<Cart>>('/active-carts/staff', {
    queries: {
      page: page || '1',
      limit: limit || DEFAULT_LIMIT,
    },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getCart(userId: string) {
  const res = await getData<CartDetails>(`/active-carts/staff/${userId}`);
  if ('error' in res) throw new Error(res.error);

  return res.data;
}
