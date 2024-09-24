import { BaseResponse } from "atoms/Base.type";
import instance from "./clientApi";
import { IBookCase } from 'atoms/BookCase.type';


// 나의 책장 조회 API 호출 (단일 객체 반환)
export const getMyBookCase = async (): Promise<IBookCase> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookCase>>('/book/bookcase/me');

  if (!success) {
    throw new Error('나의 책장 조회 실패');
  }

  return data; // 단일 객체 반환
};


// 타인 책장 목록 조회
export const getOtherBookCase = async (findUserId: number): Promise<IBookCase> => {
  const {
    data: { success, data }, 
  } = await instance.get<BaseResponse<IBookCase>>(`/book/bookcase/${findUserId}`);

  if (!success) {
    throw new Error("타인 책장 조회 실패");
  }

  console.log("타인 책장 조회", data)
  return data;
}


// 관심 책장 목록 조회
export const getInterestBookCase = async (): Promise<IBookCase[]> => {
  const {
    data: { success, data },
  } = await instance.get<BaseResponse<IBookCase[]>>(
    "/book/bookcase/interest"
  );

  if (!success) {
    throw new Error("관심 있는 책장 조회 실패");
  }

  // console.log("관심있는 책장 조회", data);
  return data;
};


// 관심 책장 등록
export const postInterestBookCase = async (userId: number): Promise<void> => {
  if (!userId) {
    throw new Error("userId가 올바르지 않습니다."); // userId가 없으면 오류 발생
  }

  const response = await instance.post<BaseResponse<null>>(`/user/interest-user/${userId}`);
  console.log("API 응답:", response); // 응답 확인
  const { success } = response.data;

  if (!success) {
    throw new Error("관심 있는 책 등록 실패");
  }

  // console.log("관심책장 등록 성공");
};


// 관심 책장 해제
export const deleteInterestBookCase = async (userId: number): Promise<void> => {
  const {
    data: { success },
  } = await instance.delete<BaseResponse<null>>(`/user/interest-user/${userId}`);

  if (!success) {
    throw new Error("관심 있는 책 해제 실패");
  }

  // console.log("관심 책장 해제 성공")
};

