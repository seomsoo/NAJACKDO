export interface IBookDetail {
  bookId: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
  description: string;
  publisher: string;
  priceStandard: number;
  itemPage: number;
  starPoint: number;
  pubDate: string;
  isbn: number;
  interest: boolean;
}

export interface BookCaseResponse {
  alreadyExistBooks: IBookDetail[];
  bookDataList: IBookDetail[];
}

export interface IUserBookDetail {
  ownerId: number;
  nickname: string;
  profileImage: string;
  mannerScore: number;
  locationName: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  genre: string;
  bookDescription: string;
  userBookId: number;
  bookStatus: string;
  ondayPrice: number;
  backImagePath: string;
  frontImagePath: string;
  inspectFrontImagePath: string;
  inspectBackImagePath: string;
  usedPrice: number;
  ripped: number;
  wornout: number;
}

export interface IRentalCost {
  userBookId: number;
  updateRentalCost: number;
}

export interface ITimeSpent {
  bookId: number;
  genre: string;
  timeSpent: number;
}

export interface INearAvailableBook {
  userBookId: number;
  imagePath: string;
  bookStatus: string;
  oneDayPrice: number;
}

export interface IRecommBook {
  book_id: number;
  fitness: number;
  cover: string;
}

export interface IRecommendBooks {
  recommended_items_with_scores: IRecommBook[];
}
