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
  category?: { cover: string; nameAr: string; nameEn: string; _id: string } | null;
}

export interface SubCategoryDetails extends Omit<SubCategory, 'products' | 'category'> {
  products: Product[];
  category?: Category;
}
