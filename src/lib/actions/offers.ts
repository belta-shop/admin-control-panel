'use server';

import { revalidateTag } from 'next/cache';

import { OfferFormData } from '@/view/sections/offers/new-edit-form';

import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { ListResponse } from '../types/api/metadata';
import { Offer, OfferDetails } from '../types/api/offers';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getOffer(id: string) {
  const res = await getData<OfferDetails>('/offers/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);
  return res.data;
}

export async function getOfferList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
  search,
  disabled,
  employeeReadOnly,
}: {
  page?: string;
  limit?: string;
  search?: string;
  disabled?: string;
  employeeReadOnly?: string;
}) {
  const res = await getData<ListResponse<Offer>>('/offers', {
    queries: {
      page,
      limit,
      search,
      disabled,
      employeeReadOnly,
    },
    tags: [RevalidateTags.OfferList],
  });
  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createOffer(data: OfferFormData) {
  const res = await postData('/offers', data);

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.OfferList);

  return res.data;
}

export async function updateOffer(id: string, data: Partial<OfferFormData>) {
  const res = await patchData('/offers/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.OfferList);

  return res.data;
}

export async function deleteOffer(id: string) {
  const res = await deleteData('/offers/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.OfferList);
}
