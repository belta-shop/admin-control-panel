'use server';

import { postData } from '../utils/crud-fetch-api';

export async function uploadSingle(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  const res = await postData<{ url: string }, FormData>('/upload/single', formData);

  if ('error' in res) throw new Error(res.error);

  return res.data.url;
}

export async function uploadMultiple(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const res = await postData<{ urls: string[] }, FormData>('/upload/multiple', formData);

  if ('error' in res) throw new Error(res.error);

  return res.data.urls;
}
