export interface IBookCase {
  userId: number;
  nickname: string; 
  profileImage: string,
  displayBooks: {
    bookId: number; 
    userBookId: number; 
    cover: string; 
    bookStatus: string;
  }[];
}