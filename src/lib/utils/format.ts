import { toFormData } from 'axios';

export const fSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const calculateDataSize = (data: Record<string, any>) => {
  const formData = new FormData();
  toFormData(data, formData);

  // Calculate the size of the FormData
  let dataSize = 0;
  for (const [_key, value] of formData.entries()) {
    if (value instanceof File) {
      dataSize += value.size;
    } else if (typeof value === 'string') {
      dataSize += new Blob([value]).size;
    }
  }

  return dataSize;
};
