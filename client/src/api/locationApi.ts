import instance from "api/clientApi";
import { BaseResponse, IPaging } from "atoms/Base.type";
import { INearLocation } from "atoms/Location.type";


export const getNearLocation = async (
  latitude: number,
  longitude: number,
  page: number
// ): Promise<IPaging<INearLocation[]>> => {
): Promise<IPaging<INearLocation[]>> => {

  
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IPaging<INearLocation[]>>>(
    `/location/near-location?latitude=${latitude}&longitude=${longitude}&page=${page}`
  );

  if (!success) {
    throw new Error("주변 동 조회 실패");
  }

  console.log("getNearLocation",data);

  return data;
};
