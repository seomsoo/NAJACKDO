import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IValid } from "atoms/Valid.type";

// 유효성 검사
export const getValid = async (): Promise<IValid> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IValid>>("/user/valid");

    if (!success) {
      throw new Error("유효성 검사에 실패했습니다.");
    }

    return data;
  } catch (error) {
    throw new Error("유효성 검사에 실패했습니다.", error);
  }
};
