import instance from "api/clientApi";
import { BaseResponse } from "atoms/Base.type";
import { IChat, IChatList } from "atoms/Chat.type";

// 채팅방 조회
export const getChatRoom = async (): Promise<IChat> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IChat>>("/chatroom");

    if (!success) {
      throw new Error("채팅방 조회에 실패");
    }

    console.log("채팅방 조회 성공", "getChatRoom");

    return data;
  } catch (error) {
    throw new Error("채팅방 조회 실패", error);
  }
};

// 채팅 내역 불러오기
export const getChatList = async (roomId: number): Promise<IChatList> => {
  try {
    const {
      data: { success, data },
    } = await instance.get<BaseResponse<IChatList>>("/chatroom/chat", {
      params: {
        roomId: roomId,
      },
    });

    if (!success) {
      throw new Error("채팅 내역 조회 실패");
    }

    return data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error("채팅 내역 조회 실패", error);
  }
};

// 채팅방 생성
export const postCreateChatRoom = async (ChattingData): Promise<number> => {
  try {
    const {
      data: { success, data },
    } = await instance.post<BaseResponse<number>>("/chatroom", ChattingData);

    if (!success) {
      throw new Error("채팅방 생성 실패");
    }

    return data;
  } catch (error) {
    throw new Error("채팅방 생성 실패", error);
  }
};
