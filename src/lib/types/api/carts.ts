export interface Cart {
  _id: string;
  user: CartUser;
  finalPrice: number;
  productsCount: number;
}

export interface CartDetails {
  _id: string;
  user: CartUser;
  finalPrice: number;
  products: CartProduct[];
}

export interface CartProduct {
  productId: string;
  nameAr: string;
  nameEn: string;
  cover: string;
  quantity: number;
  itemPrice: number;
  totalPrice: number;
  _id: string;
}

export interface CartUser {
  _id: string;
  fullName: string;
  email: string;
}
