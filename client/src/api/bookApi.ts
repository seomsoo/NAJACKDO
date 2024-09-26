import { BaseResponse } from "atoms/Base.type";
import { IInterestBook } from "atoms/Book.type";
import instance from "./clientApi";

// 관심 도서 조회
export const getInterestbook = async (): Promise<IInterestBook[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IInterestBook[]>>("/book/interest");

    if (!success) {
      throw new Error("관심 있는 책 조회 실패");
    }

    console.log("getInterestbook");

    return data;
  } catch (error) {
    throw new Error("관심 도서 조회 실패", error);
  }
};

// 관심 도서 등록
export const postInterestbook = async (bookId: number): Promise<void> => {
  try {
    const {
      data: { success },
    } = await instance.post<BaseResponse<null>>(`/book/interest/${bookId}`);

    if (!success) {
      throw new Error("관심 도서 등록 실패");
    }

    console.log("postInterestbook");
  } catch (error) {
    throw new Error("관심 도서 등록 실패", error);
  }
};

// 관심 도서 해제
export const deleteInterestbook = async (bookId: number): Promise<void> => {
  try {
    const {
      data: { success },
    } = await instance.delete<BaseResponse<null>>(`/book/interest/${bookId}`);

    if (!success) {
      throw new Error("관심 있는 책 해제 실패");
    }

    console.log("deleteInterestbook");
  } catch (error) {
    throw new Error("관심 도서 해제 실패", error);
  }
};

// isbn으로 도서 등록
export const postRegisterBook = async (isbn: number): Promise<void> => {
  console.log("post isbn", isbn);
  try {
    const {
      data: { success, data, message, status },
    } = await instance.post<BaseResponse<void>>("/book/regist-book", { isbn });

    console.log("success", success);
    console.log("message", message);
    console.log("status", status);
    console.log("postRegisterBook");
  } catch (error) {
    throw new Error("isbn으로 도서 등록 실패", error);
  }
};

// isbn or title로 도서 검색
export const getBookInfo = async ({
  kind,
  keyword,
}: {
  kind: string;
  keyword: string | number;
}): Promise<IInterestBook> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IInterestBook>>(
      `/book?${kind}=${keyword}`
    );

    if (!success) {
      throw new Error("도서 검색 실패");
    }

    console.log("getBookInfo");

    return data;
  } catch (error) {
    throw new Error("도서 검색 실패", error);
  }
};
