'use server';

import { revalidateTag } from 'next/cache';

import { BrandFormData } from '@/view/sections/brands/new-edit-form';

import { uploadSingle } from './upload';
import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { Brand, BrandDetails } from '../types/api/brands';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getBrand(id: string) {
  const res = await getData<BrandDetails>('/brands/staff/:id', {
    tags: [`${RevalidateTags.BrandSingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getBrandList({
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
  const res = await getData<{ items: Brand[]; total: number }>('/brands/staff', {
    queries: {
      page,
      limit,
      search,
      disabled,
      employeeReadOnly,
    },
    tags: [RevalidateTags.BrandList],
  });
  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createBrand(data: BrandFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  const res = await postData<Brand, unknown>('/brands/staff', data);

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.BrandList);

  return res.data;
}

export async function updateBrand(id: string, data: BrandFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  const res = await patchData<Brand, unknown>('/brands/staff/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.BrandList);
  revalidateTag(`${RevalidateTags.BrandSingle}-${id}`);

  return res.data;
}

export async function deleteBrand(id: string) {
  const res = await deleteData('/brands/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.BrandList);
}
