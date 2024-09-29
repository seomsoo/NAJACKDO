export interface ICartList {
  cartId: number;
  ownerId: number;
  ownerUsername: string;
  cartItems: ICartItem[];
}

export interface ICartItem {
  cartItemId: number;
  bookImage: string;
  bookTitle: string;
  author: string;
  price: number;
}
