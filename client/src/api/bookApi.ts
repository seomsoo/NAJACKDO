import { BaseResponse } from "atoms/Base.type";
import {
  IBookDetail,
  INearAvailableBook,
  IRentalCost,
  ITimeSpent,
  IUserBookDetail,
} from "atoms/Book.type";
import instance, { pythoninstance } from "./clientApi";

// 베스트셀러 조회
export const getBestSeller = async (): Promise<IBookDetail[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IBookDetail[]>>("rental/best-seller");

    if (!success) {
      throw new Error("베스트셀러 조회 실패");
    }
    console.log(getBestSeller);
    return data;
  } catch (error) {
    throw new Error("베스트셀러 실패", error);
  }
};

// 관심 도서 조회
export const getInterestbook = async (): Promise<IBookDetail[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IBookDetail[]>>("/book/interest");

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

// AI 도서 인증
export const postAiCheckBook = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await pythoninstance.post<any>(
      "/item/quality-inspection",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error("AI 도서 인증 실패:", error);
    throw error;
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
}): Promise<IBookDetail> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IBookDetail>>(
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

// 도서 상세 조회
export const getBookDetail = async (bookId: number): Promise<IBookDetail> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookDetail>>(`/book/${bookId}`);

  console.log("get", data);

  if (!success) {
    throw new Error("도서 상세 조회 실패");
  }

  return data;
};

// 비슷한 책 추천
export const getRecommendbook = async (
  bookId: number
): Promise<IBookDetail[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IBookDetail[]>>(`/recommend/${bookId}`);

    if (!success) {
      throw new Error("비슷한 책 추천 실패");
    }

    console.log("getRecommendbook");

    return data;
  } catch (error) {
    throw new Error("비슷한 책 추천 실패", error);
  }
};

// 대여 도서 상세 조회
export const getUserBookDetail = async (
  userBookId: number
): Promise<IUserBookDetail> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IUserBookDetail>>(
    `/user-book/${userBookId}`
  );

  console.log("getUserBookDetail 대여도사 상세", data);

  if (!success) {
    throw new Error("대여 도서 상세 조회 실패");
  }

  return data;
};

// 대여료 수정
export const postUpdateRentalCost = async (RentalCostData): Promise<void> => {
  try {
    const {
      data: { success, data },
    } = await instance.post<BaseResponse<IRentalCost>>(
      "/user-book/update/rental-cost",
      RentalCostData
    );

    if (!success) {
      throw new Error("대여료 수정 실패");
    }
  } catch (error) {
    throw new Error("대여료 수정 실패", error);
  }
};

// 체류시간 저장
export const postTimeSpent = async (TimeData): Promise<void> => {
  try {
    const {
      data: { success, data },
    } = await instance.post<BaseResponse<ITimeSpent>>(
      "/recommend/visits",
      TimeData
    );

    if (!success) {
      throw new Error("체류 시간 저장 실패");
    }
  } catch (error) {
    throw new Error("체류 시간 저장 실패", error);
  }
};

// 대여 가능한 주변 도서 조회
export const getNearAvailableBook = async (
  bookId: number
): Promise<INearAvailableBook[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<INearAvailableBook[]>>(
    `user-book/near-available/${bookId}`
  );

  console.log("getNearAvailableBook", data);

  if (!success) {
    throw new Error("대여 가능한 주변 도서 조회 실패");
  }

  return data;
};
