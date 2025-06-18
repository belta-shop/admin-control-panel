export type FileCategory = 'images' | 'videos' | 'audios' | 'documents' | 'archives' | 'code';
export type FileVariant = 'all' | FileCategory;

export type FileType = {
  mime: string;
  extension: string;
};

export type FileTypesList = {
  [category in FileCategory]: {
    [name: string]: FileType;
  };
};
