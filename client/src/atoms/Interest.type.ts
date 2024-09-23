export interface IInterestBook {
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

export interface IInterestBookCase {
  userName: string;
  displayBooks: {
    bookId: number; 
    cover: string; 
    bookStatus: string;
  }[];
}


