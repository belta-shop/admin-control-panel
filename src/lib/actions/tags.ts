'use server';

import { revalidateTag } from 'next/cache';

import { TagFormData } from '@/view/sections/tags/new-edit-form';

import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { Tag, TagDetails } from '../types/api/tags';
import { ListResponse } from '../types/api/metadata';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getTag(id: string) {
  const res = await getData<TagDetails>('/tags/staff/:id', {
    tags: [`${RevalidateTags.TagSingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getTagList({
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
  const res = await getData<ListResponse<Tag>>('/tags/staff', {
    queries: {
      page: page || '1',
      limit: limit || DEFAULT_LIMIT,
      search: search,
      disabled: disabled,
      employeeReadOnly: employeeReadOnly,
    },
    tags: [RevalidateTags.TagList],
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createTag(data: TagFormData) {
  const res = await postData<Tag, unknown>('/tags/staff', data);

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.TagList);

  return res.data;
}

export async function updateTag(id: string, data: TagFormData) {
  const res = await patchData<Tag, unknown>('/tags/staff/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.TagList);
  revalidateTag(`${RevalidateTags.TagSingle}-${id}`);

  return res.data;
}

export async function deleteTag(id: string) {
  const res = await deleteData('/tags/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.SubCategoryList);

  return res.data;
}

export async function linkTagToProduct({ tagId, productId }: { tagId: string; productId: string }) {
  const res = await postData('/tags/staff/link', {
    tagId,
    productId,
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.TagList);
  revalidateTag(`${RevalidateTags.TagSingle}-${tagId}`);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);

  return res.data;
}

export async function unlinkTagFromProduct({
  productId,
  tagId,
}: {
  productId: string;
  tagId: string;
}) {
  const res = await postData('/tags/staff/unlink', { productId, tagId });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.TagList);
  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.TagSingle}-${tagId}`);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);

  return res.data;
}
