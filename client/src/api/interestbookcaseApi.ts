import instance from './clientApi';
import { IInterestBookCase } from 'atoms/Interest.type';
import { BaseResponse } from 'atoms/Base.type';


// 관심 책장 목록 조회
export const getInterestBookCase = async (): Promise<IInterestBookCase[]> => {
  const {
    data: {success, data },
  } = await instance.get<BaseResponse<IInterestBookCase[]>>("/book/bookcase/interest");

  if (!success) {
    throw new Error("관심 있는 책장 조회 실패")
  }

  console.log("관심있는 책장 조회", data);
  return data;
};

