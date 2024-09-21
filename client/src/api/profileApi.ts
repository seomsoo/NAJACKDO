import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { ILeafLog, INickname, IProfile, IUserInfo } from "atoms/Profile.type";

// 유저 정보 입력
export const setUserInfo = async (data: IUserInfo): Promise<void> => {
  const {
    data: { success },
  } = await instance.post<BaseResponse<void>>("/user/info", data);

  if (!success) {
    throw new Error("유저 정보 입력 실패");
  }
};

// 유저 정보 조회
export const getUserInfo = async (): Promise<IProfile> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IProfile>>("/user/info");

  if (!success) {
    throw new Error("유저 정보 조회 실패");
  }

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

// 유저 닉네임 조회
export const getUserNickname = async (): Promise<INickname> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<INickname>>("/user/nickname");

  if (!success) {
    throw new Error("유저 닉네임 조회 실패");
  }

  return data;
};

// 닉네임 중복 확인
export const availableNickname = async (nickname: string): Promise<boolean> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<boolean>>(`/user/available-nickname/${nickname}`);

  if (!success) {
    throw new Error("닉네임 중복 조회 실패");
  }

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
