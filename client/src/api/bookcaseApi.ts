import { BaseResponse } from "atoms/Base.type";
import { IBookCase } from "atoms/BookCase.type";
import { BookCaseResponse, IBookDetail } from "atoms/Book.type";
import instance from "api/clientApi";

// 나의 책장 조회 API 호출
export const getMyBookCase = async (): Promise<IBookCase> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookCase>>("/book/bookcase/me");

  if (!success) {
    throw new Error("나의 책장 조회 실패");
  }

  return data;
};

// 타인 책장 목록 조회
export const getOtherBookCase = async (findUserId: number): Promise<IBookCase> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookCase>>(`/book/bookcase/${findUserId}`);

  if (!success) {
    throw new Error("타인 책장 조회 실패");
  }

  return data;
};

// 관심 책장 목록 조회
export const getInterestBookCase = async (): Promise<IBookCase[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookCase[]>>("/book/bookcase/interest");

  if (!success) {
    throw new Error("관심 있는 책장 조회 실패");
  }

  return data;
};

// 관심 책장 등록
export const postInterestBookCase = async (userId: number): Promise<void> => {
  if (!userId) {
    throw new Error("userId가 올바르지 않습니다.");
  }

  const response = await instance.post<BaseResponse<null>>(`/user/interest-user/${userId}`);
  const { success } = response.data;

  if (!success) {
    throw new Error("관심 있는 책 등록 실패");
  }
};

// 관심 책장 해제
export const deleteInterestBookCase = async (userId: number): Promise<void> => {
  const {
    data: { success },
  } = await instance.delete<BaseResponse<null>>(`/user/interest-user/${userId}`);

  if (!success) {
    throw new Error("관심 있는 책 해제 실패");
  }
};

// 책장 사진으로 도서 리스트 반환
export const postBookCaseImage = async (formData: FormData): Promise<BookCaseResponse> => {
  const { data } = await instance.post<BaseResponse<BookCaseResponse>>(
    "/book/regist-books",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log("책장 사진으로 도서 리스트 반환", data);

  if (!data.success) {
    throw new Error("책장 사진으로 도서 리스트 반환 실패");
  }

  return data.data;
};

// ids로 도서 등록
export const postBookCaseByIds = async (bookIds: number[]): Promise<void> => {
  const { data } = await instance.post<BaseResponse<null>>("/book/regist-books-by-ids", {
    bookIds,
  });

  console.log("도서 등록", data);

  if (!data.success) {
    throw new Error("도서 등록 실패");
  }
};
