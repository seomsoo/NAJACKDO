export interface IHistory {
  rentalId: number;
  otherUseNickName: string;
  otherUseProfileImg: string;
  rentalStartDate: string;
  rentalEndDate: string;
  status: string;
  rentalCost: number;
  rentalPeriod: number;
  rentalBooks: IHistoryBook[];
}

export interface IHistoryBook {
  coverImg: string;
  title: string;
  author: string;
  publisher: string;
  oneDayPrice: number;
}
