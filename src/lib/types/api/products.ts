import { Tag } from './tags';
import { Brand } from './brands';
import { Label } from './labels';
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
  price: number;
  finalPrice: number;
  offer: Offer;
  employeeReadOnly: boolean;
}

export interface ProductDetails extends Omit<Product, 'labels' | 'tags'> {
  labels: Label[];
  tags: Tag[];
}

export interface Offer {
  _id: string;
  nameAr: string;
  nameEn: string;
  product: string;
  offerQuantity: number;
  maxPerClient: number;
  quantityPurchased: number;
  disabled: boolean;
  type: string;
  value: number;
  employeeReadOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
