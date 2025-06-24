'use server';

import { revalidateTag } from 'next/cache';

import { CategoryFormData } from '@/view/sections/categories/new-edit-form';

import { uploadSingle } from './upload';
import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { Category, CategoryDetails } from '../types/api/categories';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getCategory(id: string) {
  const res = await getData<CategoryDetails>('/categories/staff/:id', {
    tags: [`${RevalidateTags.CategorySingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getCategoryList({
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
  const res = await getData<{ items: Category[]; total: number }>('/categories/staff', {
    queries: {
      page,
      limit,
      search,
      disabled,
      employeeReadOnly,
    },
    tags: [RevalidateTags.CategoryList],
  });
  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createCategory(data: CategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  const res = await postData<Category, unknown>('/categories/staff', data);

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.CategoryList);

  return res.data;
}

export async function updateCategory(id: string, data: CategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  const res = await patchData<Category, unknown>('/categories/staff/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.CategoryList);
  revalidateTag(`${RevalidateTags.CategorySingle}-${id}`);

  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await deleteData<Category>('/categories/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.CategoryList);
}
