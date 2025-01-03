import { BaseResponse } from "atoms/Base.type";
import instance from "./clientApi";

// ready
export const chargeKapay = async (
  deviceType: string,
  openType: string,
  itemName: string,
  totalAmount: number
): Promise<string> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<string>>(
      `/kapay/ready/${deviceType}/${openType}`,
      {
        params: {
          itemName,
          totalAmount,
        },
      }
    );

    if (!success) {
      throw new Error("카카오페이 결제 준비 실패");
    }

    return data;
  } catch (error) {
    throw new Error("카카오페이 결제 준비에 실패했습니다.");
  }
};
