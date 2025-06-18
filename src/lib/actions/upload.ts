'use server';

import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';

export async function uploadSingle(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  const res = await axiosInstance.post<{ url: string }>(endpoints.upload.single, formData);
  return res.data.url;
}

export async function uploadMultiple(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });
}
