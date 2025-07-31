import { DEFAULT_LIMIT } from '../config/global';
import { getData } from '../utils/crud-fetch-api';
import { ListResponse } from '../types/api/metadata';
import { Order, OrderDetails } from '../types/api/orders';

export async function getOrderList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
}: {
  page?: string;
  limit?: string;
}) {
  const res = await getData<ListResponse<Order>>('/orders/staff', {
    queries: {
      page: page || '1',
      limit: limit || DEFAULT_LIMIT,
    },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getOrder(orderId: string) {
  const res = await getData<OrderDetails>(`/orders/staff/${orderId}`);
  if ('error' in res) throw new Error(res.error);

  return res.data;
}
