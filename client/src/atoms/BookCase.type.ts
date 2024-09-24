export interface IBookCase {
  userId: number;
  nickname: string;

}

export interface IInterestBookCase {
  userName: string;
  userId: number;
  nickname: string; 
  displayBooks: {
    bookId: number; 
    cover: string; 
    bookStatus: string;
  }[];
}
