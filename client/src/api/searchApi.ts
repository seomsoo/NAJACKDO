import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IAutoArray, ISearch } from "atoms/Search.type";

// 인기 검색어 조회
export const getPopularSearch = async (): Promise<string[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<string[]>>("/search/popularity");

    if (!success) {
      throw new Error("인기 검색어 조회에 실패했습니다.");
    }

    console.log("getPopularSearch");

    return data;
  } catch (error) {
    throw new Error("인기 검색어 조회에 실패했습니다.", error);
  }
};

// 최근 검색어 조회
export const getRecentSearch = async (): Promise<string[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<string[]>>("/search/recent");

    if (!success) {
      throw new Error("최근 검색어 조회에 실패했습니다.");
    }

    console.log("getRecentSearch");

    return data;
  } catch (error) {
    throw new Error("최근 검색어 조회에 실패했습니다.", error);
  }
};

// 검색
export const getSearch = async (keyword: string): Promise<ISearch[]> => {
  try {
    console.log("keyword", keyword);
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<ISearch[]>>(
      `/search?keyword=${keyword}`
    );

    if (!success) {
      throw new Error("검색에 실패했습니다.");
    }

    console.log("getSearch");

    return data;
  } catch (error) {
    throw new Error("검색에 실패했습니다.", error);
  }
};

// 자동완성 검색어 조회
export const getAutoSearchText = async (
  keyword: string
): Promise<IAutoArray> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IAutoArray>>(
      `/search/auto-complete?keyword=${keyword}`
    );

    if (!success) {
      throw new Error("자동완성 검색어 조회에 실패했습니다.");
    }

    console.log("getAutoSearchText");

    return data;
  } catch (error) {
    throw new Error("자동완성 검색어 조회에 실패했습니다.", error);
  }
};

// 최근 검색어 삭제
export const deleteRecentSearch = async (keyword: string): Promise<void> => {
  try {
    const {
      data: { success },
    } = await instance.delete<BaseResponse<void>>(`search/recent/${keyword}`);

    if (!success) {
      throw new Error("최근 검색어 삭제에 실패했습니다.");
    }

    console.log("deleteRecentSearch");
  } catch (error) {
    throw new Error("최근 검색어 삭제에 실패했습니다.", error);
  }
};
