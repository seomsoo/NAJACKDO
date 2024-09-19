import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { ILeafLog, IProfile } from "atoms/Profile.type";

// 유저 정보 조회
export const getUserInfo = async (): Promise<IProfile> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IProfile>>("/user/info");

  if (!success) {
    throw new Error("유저 정보 조회 실패");
  }

  console.log("getuserInfo");

  return data;
};

// 유저 책잎 로그 조회
export const getLeafLog = async (): Promise<ILeafLog[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<ILeafLog[]>>("/user/cashlog");

  if (!success) {
    throw new Error("유저 책잎 로그 조회 실패");
  }

  console.log("getLeafLog");

  return data;
};

// 다른 사람 프로필 조회
export const getOtherProfile = async (nickname: string): Promise<IProfile> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IProfile>>(`/user/info/${nickname}`);

  if (!success) {
    throw new Error("다른 사람 프로필 조회 실패");
  }

  console.log("getOtherProfile");

  return data;
};
