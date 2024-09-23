import { BaseResponse } from "atoms/Base.type";
import { IInterestBook } from "atoms/Interest.type";
import instance from "./clientApi";

// 관심 도서 조회
export const getInterestbook = async (): Promise<IInterestBook[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IInterestBook[]>>("/book/interest");

  if (!success) {
    throw new Error("관심 있는 책 조회 실패");
  }

  // console.log("getInterestbook called", data);
  return data;
};

// 관심 도서 등록
export const postInterestbook = async (bookId: number): Promise<void> => {
  const {
    data: { success },
  } = await instance.post<BaseResponse<null>>(`/book/interest/${bookId}`);

  if (!success) {
    throw new Error("관심 있는 책 등록 실패");
  }

  // console.log("관심도서 등록 성공")
};

// 관심 도서 해제
export const deleteInterestbook = async (bookId: number): Promise<void> => {
  const {
    data: { success },
  } = await instance.delete<BaseResponse<null>>(`/book/interest/${bookId}`);

  if (!success) {
    throw new Error("관심 있는 책 해제 실패");
  }

  // console.log("관심 도서 해제 성공")
};
