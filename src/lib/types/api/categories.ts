import { SubCategory } from './sub-categories';

export interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  subcategories: string[];
}
export interface CategoryDetails extends Omit<Category, 'subcategories'> {
  subcategories: SubCategory[];
}
