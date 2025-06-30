import { Product } from './products';

export interface Offer {
  _id: string;
  nameAr: string;
  nameEn: string;
  product: {
    coverList: string[];
    _id: string;
    nameAr: string;
    nameEn: string;
    price: number;
    finalPrice: number;
  };
  type: 'percent' | 'fixed';
  value: number;
  disabled: boolean;
  offerQuantity: number;
  maxPerClient: number;
  employeeReadOnly: boolean;
}

export interface OfferDetails extends Omit<Offer, 'product'> {
  product: Product;
}
