import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IValid } from "atoms/Valid.type";

// export const getValid = async (): Promise<IValid> => {
//   try {
//     const { data, success} = await instance.get<BaseResponse<IValid>
//   } catch (error) {
//     throw new Error("유효성 검사 실패", error);
//   }
// };
