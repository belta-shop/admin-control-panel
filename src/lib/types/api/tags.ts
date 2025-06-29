import { Product } from './products';

export interface Tag {
  _id: string;
  nameAr: string;
  nameEn: string;
  products: string[];
  employeeReadOnly: boolean;
  disabled: boolean;
}

export interface TagDetails extends Omit<Tag, 'products'> {
  products: Product[];
}
