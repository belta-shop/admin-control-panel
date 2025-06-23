import { Category } from './categories';

export interface SubCategory {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  products: any[];
  category: Category;
}
