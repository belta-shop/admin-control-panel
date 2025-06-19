'use server';

import { CategoryFormData } from '@/view/sections/categories/new-edit-form';

import { uploadSingle } from './upload';
import { axiosInstance } from '../utils/axios';
import { endpoints } from '../config/endpoints';

export async function createCategory(data: CategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  await axiosInstance.post(endpoints.categories.create, data);
}

export async function updateCategory(id: string, data: CategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  await axiosInstance.patch(endpoints.categories.patch(id), data);
}
