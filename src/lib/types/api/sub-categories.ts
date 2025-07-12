import { Product } from './products';

export interface SubCategory {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  products: string[];
  category?: { nameAr: string; nameEn: string; _id: string } | null;
}

export interface SubCategoryDetails extends Omit<SubCategory, 'products'> {
  products: Product[];
}
