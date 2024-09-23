import instance from "api/clientApi";
import { BaseResponse, IPaging } from "atoms/Base.type";
import { INearLocation, ILocationRange } from "atoms/Location.type";

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

  console.log('lat', latitude)
  console.log('lon', longitude)
  console.log('page', page)
  console.log('data', data)

  if (!success) {
    throw new Error("주변 동 조회 실패");
  }

  // console.log("getNearLocation", data);

  return data;
};

// 사용자의 주변 활동 범위
export const getLocationRange = async (
  latitude: number,
  longitude: number,
): Promise<ILocationRange[]> => {
  
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<ILocationRange[]>>(
    `/location/near-neighborhood?latitude=${latitude}&longitude=${longitude}`
  );

  console.log('getLocationRange')
  console.log('lat', latitude)
  console.log('lon', longitude)
  console.log('data', data)
  console.log( `/location/near-neighborhood?latitude=${latitude}&longitude=${longitude}`)

  if (!success) {
    throw new Error("범위 설정 실패");
  }

  return data;
};
