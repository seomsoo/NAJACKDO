import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { ILeafLog, INickname, IProfile, IUserInfo } from "atoms/Profile.type";

// 유저 정보 입력
export const postUserInfo = async (data: IUserInfo): Promise<void> => {
  try {
    const {
      data: { success },
    } = await instance.post<BaseResponse<void>>("/user/info", data);

    if (!success) {
      throw new Error("유저 정보 입력 실패");
    }
  } catch (error) {
    throw new Error("유저 정보 입력 실패", error);
  }
};

// 유저 정보 조회
export const getUserInfo = async (): Promise<IProfile> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IProfile>>("/user/info");

    if (!success) {
      throw new Error("유저 정보 조회 실패");
    }

    return data;
  } catch (error) {
    throw new Error("유저 정보 조회 실패", error);
  }
};

// 유저 책잎 로그 조회
export const getLeafLog = async (): Promise<ILeafLog[]> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<ILeafLog[]>>("/user/cashlog");

    if (!success) {
      throw new Error("유저 책잎 로그 조회 실패");
    }

    return data;
  } catch (error) {
    throw new Error("유저 책잎 로그 조회 실패", error);
  }
};

// 유저 닉네임 조회
export const getUserNickname = async (): Promise<INickname> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<INickname>>("/user/nickname");

    if (!success) {
      throw new Error("유저 닉네임 조회 실패");
    }

    return data;
  } catch (error) {
    throw new Error("유저 닉네임 조회 실패", error);
  }
};

// 닉네임 중복 확인
export const availableNickname = async (nickname: string): Promise<boolean> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<boolean>>(
      `/user/available-nickname/${nickname}`
    );

    if (!success) {
      throw new Error("닉네임 중복 조회 실패");
    }

    return data;
  } catch (error) {
    throw new Error("닉네임 중복 조회 실패", error);
  }
};

// 다른 사람 프로필 조회
export const getOtherProfile = async (nickname: string): Promise<IProfile> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IProfile>>(
      `/user/info/${encodeURIComponent(nickname)}`
    );

    if (!success) {
      throw new Error("다른 사람 프로필 조회 실패");
    }

    return data;
  } catch (error) {
    throw new Error("다른 사람 프로필 조회 실패", error);
  }
};

// 로그아웃
export const postSignOut = async (): Promise<void> => {
  try {
    await instance.post<void>("/auth/sign-out");
  } catch (error) {
    throw new Error("로그아웃 실패", error);
  }
};
