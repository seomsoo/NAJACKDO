import instance from "api/clientApi";
import { BaseResponse, IPaging } from "atoms/Base.type";
import { ICartList, ICartItem } from "atoms/Cart.type";

// 장바구니 조회
export const getCartList = async (
): Promise<ICartList[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<ICartList[]>>(
    "/cart/list"
  );

  console.log('getCartList data', data)
  
  if (!success) {
    throw new Error("장바구니 조회 실패");
  }


  return data;
};


// 사용자 지역/범위 설정
export const postDeleteCartItem = async (cartItemId  : number): Promise<void> => {
  console.log('cartItemId', cartItemId)
  try {
    const {
      data : {success}
    } = await instance.post<BaseResponse<void>>(
      `/cart-item/delete/${cartItemId}`) 

    if (!success) {
      throw new Error("장바구니 아이템 삭제 실패");
    }

    
  } catch (error) {
    throw new Error("장바구니 아이템 삭제 실패", error);
  }
}

