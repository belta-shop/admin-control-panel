import { CartUser, CartProduct } from './carts';

export interface Order {
  _id: string;
  user: CartUser;
  finalPrice: number;
  productsCount: number;
  status: 'confirmed' | 'cancelled' | 'delivered';
}

export interface OrderDetails {
  _id: string;
  user: CartUser;
  finalPrice: number;
  products: CartProduct[];
  status: 'confirmed' | 'cancelled' | 'delivered';
}
