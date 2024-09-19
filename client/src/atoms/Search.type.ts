export interface ISearch {
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
  isbn: string;
}

export interface IAutoSearch {
  value: string;
  score: number;
}
