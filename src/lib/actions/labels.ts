'use server';

import { revalidateTag } from 'next/cache';

import { LabelFormData } from '@/view/sections/labels/new-edit-form';

import { RevalidateTags } from '../config/api';
import { DEFAULT_LIMIT } from '../config/global';
import { Label, LabelDetails } from '../types/api/labels';
import { getData, postData, patchData, deleteData } from '../utils/crud-fetch-api';

export async function getLabel(id: string) {
  const res = await getData<LabelDetails>('/labels/staff/:id', {
    tags: [`${RevalidateTags.LabelSingle}-${id}`],
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function getLabelList({
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
  const res = await getData<{ items: Label[]; total: number }>('/labels/staff', {
    queries: {
      page: page || '1',
      limit: limit || DEFAULT_LIMIT,
      search: search,
      disabled: disabled,
      employeeReadOnly: employeeReadOnly,
    },
    tags: [RevalidateTags.LabelList],
  });

  if ('error' in res) throw new Error(res.error);

  return res.data;
}

export async function createLabel(data: LabelFormData) {
  const res = await postData<Label, unknown>('/labels/staff', data);

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.LabelList);

  return res.data;
}

export async function updateLabel(id: string, data: LabelFormData) {
  const res = await patchData<Label, unknown>('/labels/staff/:id', data, {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.LabelList);
  revalidateTag(`${RevalidateTags.LabelSingle}-${id}`);

  return res.data;
}

export async function deleteLabel(id: string) {
  const res = await deleteData('/labels/staff/:id', {
    params: { id },
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.LabelList);

  return res.data;
}

export async function linkLabelToProduct({
  labelId,
  productId,
}: {
  labelId: string;
  productId: string;
}) {
  const res = await postData('/labels/staff/link', {
    labelId,
    productId,
  });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.LabelList);
  revalidateTag(`${RevalidateTags.LabelSingle}-${labelId}`);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);

  return res.data;
}

export async function unlinkLabelFromProduct({
  productId,
  labelId,
}: {
  productId: string;
  labelId: string;
}) {
  const res = await postData('/labels/staff/unlink', { productId, labelId });

  if ('error' in res) throw new Error(res.error);

  revalidateTag(RevalidateTags.LabelList);
  revalidateTag(RevalidateTags.ProductList);
  revalidateTag(`${RevalidateTags.LabelSingle}-${labelId}`);
  revalidateTag(`${RevalidateTags.ProductSingle}-${productId}`);

  return res.data;
}
