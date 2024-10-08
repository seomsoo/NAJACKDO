import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IRental, IReturn, IReview } from "atoms/Rental.type";

// 렌탈 신청
export const postRental = async (RentalData: IRental): Promise<object> => {
  try {
    const {
      data: { data, success },
    } = await instance.post<BaseResponse<object>>("/rental", RentalData);

    if (!success) {
      throw new Error("렌탈 신청 실패");
    }

    return data;
  } catch (error) {
    throw new Error("렌탈 신청 실패", error);
  }
};

// 반납
export const postReturn = async (ReturnData: IReturn): Promise<object> => {
  try {
    const {
      data: { data, success },
    } = await instance.post<BaseResponse<object>>("/rental/return", ReturnData);

    if (!success) {
      throw new Error("반납 신청 실패");
    }

    return data;
  } catch (error) {
    throw new Error("반납 신청 실패", error);
  }
};

// 리뷰 등록
export const postReview = async (ReviewData: IReview): Promise<object> => {
  try {
    const {
      data: { success, data },
    } = await instance.post("/review", ReviewData);

    if (!success) {
      throw new Error("리뷰 등록 실패");
    }

    return data;
  } catch (error) {
    throw new Error("리뷰 등록 실패", error);
  }
};
