import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IHistory } from "atoms/History.type";

// 빌려준 내역 조회
export const getLendHistory = async (): Promise<IHistory[]> => {
  const {
    data: { success, data, message },
  } = await instance.get<BaseResponse<IHistory[]>>("/rental/lend");

  if (!success) {
    throw new Error(message);
  }

  return data;
};

// 빌린 내역 조회
export const getBorrowHistory = async (): Promise<IHistory[]> => {
  const {
    data: { success, data, message },
  } = await instance.get<BaseResponse<IHistory[]>>("/rental/borrow");

  if (!success) {
    throw new Error(message);
  }

  return data;
};
