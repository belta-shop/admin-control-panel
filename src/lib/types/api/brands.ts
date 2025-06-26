import { Product } from './products';

export interface Brand {
  _id: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  disabled: boolean;
  employeeReadOnly: boolean;
  products: string[];
}
export interface BrandDetails extends Omit<Brand, 'products'> {
  products: BrandProduct[];
}
export interface BrandProduct extends Omit<Product, 'brand'> {
  brand: string;
}
