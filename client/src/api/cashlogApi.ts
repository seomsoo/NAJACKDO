import { BaseResponse } from "atoms/Base.type";
import { ICashLog } from "atoms/CashLog.type";
import instance from "./clientApi";

// 책잎 사용 내역 조회
export const getCashLog = async (): Promise<ICashLog[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<ICashLog[]>>("/user/cashlog");

  if (!success) {
    throw new Error("책잎 사용 내역 조회 실패");
  }

  return data;
};
