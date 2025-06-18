import { Icons } from '@/lib/config/icons';
import { FileVariant } from '@/lib/types/upload';
import { commonTypes } from '@/lib/config/upload';

export const getVariantFileTypes = (variant: FileVariant) => {
  switch (variant) {
    case 'all':
      return commonTypes.all;
    default:
      return commonTypes[variant];
  }
};

export const getVariantUploadIcon = (variant: FileVariant) => {
  switch (variant) {
    case 'all':
      return Icons.UPLOAD;
    case 'images':
      return 'uil:image-upload';
    case 'videos':
      return 'uil:video-upload';
    case 'audios':
      return 'formkit:fileaudio';
    case 'documents':
      return 'formkit:filepdf';
    case 'archives':
      return 'solar:winrar-linear';
    case 'code':
      return 'jam:code';
  }
};
