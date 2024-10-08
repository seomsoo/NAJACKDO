import instance from "api/clientApi";
import { BaseResponse, IPaging } from "atoms/Base.type";
import { IBookCase } from "atoms/BookCase.type";
import {
  ILocationRange,
  IMyLocation,
  INearLocation,
} from "atoms/Location.type";

// 유저의 위치 기반으로 가까운 순으로 동네 정보 반환
export const getNearLocation = async (
  latitude: number,
  longitude: number,
  page: number
): Promise<IPaging<INearLocation[]>> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IPaging<INearLocation[]>>>(
    `/location/near-location?latitude=${longitude}&longitude=${latitude}&page=${page}`
  );

  if (!success) {
    throw new Error("주변 동 조회 실패");
  }

  return data;
};

// 사용자의 주변 활동 범위
export const getLocationRange = async (
  latitude: number,
  longitude: number
): Promise<ILocationRange[][]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<ILocationRange[][]>>(
    `/location/near-neighborhood?latitude=${latitude}&longitude=${longitude}`
  );

  if (!success) {
    throw new Error("범위 설정 실패");
  }

  return data;
};

// 사용자 지역/범위 설정
export const postMyLocation = async (
  locationData: IMyLocation
): Promise<void> => {
  try {
    const {
      data: { success },
    } = await instance.post<BaseResponse<void>>("/location", locationData);

    if (!success) {
      throw new Error("지역 설정 실패");
    }
  } catch (error) {
    throw new Error("지역 설정 실패", error);
  }
};

// 주변 책장 목록 조회
export const getNearBookCase = async (
  page: number
): Promise<IPaging<IBookCase[]>> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IPaging<IBookCase[]>>>(
    `/book/bookcase/near?page=${page}` // 만들어주면 바꾸기
  );

  if (!success) {
    throw new Error("주변 책장 조회 실패");
  }

  return data;
};
