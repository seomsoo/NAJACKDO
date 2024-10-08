export interface IBookCase {
  userId: number;
  nickname: string; 
  profileImage: string,
  follow: boolean;
  displayBooks: {
    bookId: number; 
    userBookId: number; 
    cover: string; 
    bookStatus: string;
    bookTitle: string;
  }[];
}