import { Tag } from './tags';
import { Brand } from './brands';
import { Label } from './labels';
import { Offer } from './offers';
import { SubCategory } from './sub-categories';

export interface Product {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverList: string[];
  rating: number;
  reviews: number;
  brand: Brand | null;
  subcategory: SubCategory | null;
  labels: string[];
  tags: string[];
  quantity: number;
  disabled: boolean;
  minPrice: number;
  price: number;
  finalPrice: number;
  offer?: Omit<Offer, 'product'> & { product: string };
  employeeReadOnly: boolean;
}

export interface ProductDetails extends Omit<Product, 'labels' | 'tags'> {
  labels: Label[];
  tags: Tag[];
}
