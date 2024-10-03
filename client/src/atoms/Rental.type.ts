export interface IRental {
  cartId: number;
  rentalCost: number;
  rentalPeriod: number;
  totalPrice: number;
}

export interface IReturn {
  cartId: number;
}

export interface IReview {
  rentalId: number; // 카트아이디
  reviewItemIds: number[];
}
