import { Product } from './products';
import { Category } from './categories';

export interface SubCategory {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  products: string[];
  category?: Category | null;
}

export interface SubCategoryDetails extends Omit<SubCategory, 'products'> {
  products: Product[];
}
