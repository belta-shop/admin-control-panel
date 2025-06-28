'use server';

import { revalidateTag } from 'next/cache';

import { SubCategoryFormData } from '@/view/sections/sub-categories/new-edit-form';

import { uploadSingle } from './upload';
import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { SubCategory, SubCategoryDetails } from '../types/api/sub-categories';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getSubCategory(id: string) {
  const res = await getData<SubCategoryDetails>('/subcategories/staff/:id', {
    tags: [`${RevalidateTags.SubCategorySingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getSubCategoryList({
  page = '1',
  limit = DEFAULT_LIMIT.toString(),
  search,
  disabled,
  employeeReadOnly,
  categoryId,
}: {
  page?: string;
  limit?: string;
  search?: string;
  disabled?: string;
  employeeReadOnly?: string;
  categoryId?: string;
}) {
  const res = await getData<{ items: SubCategory[]; total: number }>('/subcategories/staff', {
    queries: {
      page: page || '1',
      limit: limit || DEFAULT_LIMIT,
      search: search,
      disabled: disabled,
      employeeReadOnly: employeeReadOnly,
      categoryId: categoryId,
    },
    tags: [RevalidateTags.SubCategoryList],
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createSubCategory(data: SubCategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);
    data.cover = cover;
  }

  const res = await postData<SubCategory, unknown>('/subcategories/staff', data, {
    tags: [RevalidateTags.SubCategoryList],
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function updateSubCategory(id: string, data: SubCategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);
    data.cover = cover;
  }

  const res = await patchData<SubCategory, unknown>('/subcategories/staff/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.SubCategoryList);
  revalidateTag(`${RevalidateTags.SubCategorySingle}-${id}`);

  return res.data;
}

export async function deleteSubCategory(id: string) {
  const res = await deleteData('/subcategories/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.SubCategoryList);

  return res.data;
}

export async function linkSubCategoryToCategory({
  subCategoryId,
  categoryId,
}: {
  subCategoryId: string;
  categoryId: string;
}) {
  const res = await postData<SubCategory, unknown>('/subcategories/staff/link', {
    subcategoryId: subCategoryId,
    categoryId,
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.SubCategoryList);
  revalidateTag(`${RevalidateTags.SubCategorySingle}-${subCategoryId}`);
  revalidateTag(`${RevalidateTags.CategorySingle}-${categoryId}`);

  return res.data;
}

export async function unlinkSubCategoryFromCategory(id: string) {
  const res = await postData('/subcategories/staff/unlink', { subcategoryId: id });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.SubCategoryList);
  revalidateTag(`${RevalidateTags.SubCategorySingle}-${id}`);

  return res.data;
}
