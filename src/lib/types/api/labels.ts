import { Product } from './products';

export interface Label {
  _id: string;
  nameAr: string;
  nameEn: string;
  color: string;
  products: string[];
  employeeReadOnly: boolean;
  disabled: boolean;
}

export interface LabelDetails extends Omit<Label, 'products'> {
  products: Product[];
}
