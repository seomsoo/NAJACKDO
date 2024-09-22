export interface ISearch {
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
}

export interface IAutoArray {
  list: IAutoSearch[];
}

export interface IAutoSearch {
  value: string;
  score: number;
}
