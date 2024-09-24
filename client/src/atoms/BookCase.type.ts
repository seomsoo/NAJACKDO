export interface IBookCase {
  userId: number;
  nickname: string; 
  displayBooks: {
    bookId: number; 
    userBookId: number; 
    cover: string; 
    bookStatus: string;
  }[];
}
