import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IProfile } from "atoms/Profile.type";

// 유저 정보 조회
export const getUserInfo = async (): Promise<IProfile> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IProfile>>("/user/info");

  if (!success) {
    throw new Error("Failed to get user info");
  }

  console.log("getuserInfo");

  return data;
};
