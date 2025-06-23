'use server';

import { SubCategoryFormData } from '@/view/sections/sub-categories/new-edit-form';

import { uploadSingle } from './upload';
import { axiosInstance } from '../utils/axios';
import { endpoints } from '../config/endpoints';

export async function createSubCategory(data: SubCategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  await axiosInstance.post(endpoints.subCategories.create, data);
}

export async function updateSubCategory(id: string, data: SubCategoryFormData) {
  if (typeof data.cover !== 'string') {
    const cover = await uploadSingle(data.cover);

    data.cover = cover;
  }

  await axiosInstance.patch(endpoints.subCategories.patch(id), data);
}
