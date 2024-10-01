export interface IChat {
  userId: number;
  chatRoomList: IChatRoom[];
}

export interface IChatRoom {
  roomId: number;
  cartId: number;
  customerId: number;
  customerNickname: string;
  customerProfile: string;
  customerLocation: string;
  ownerId: number;
  ownerNickname: string;
  ownerProfile: string;
  ownerLocation: string;
  lastChatTime: string;
  lastChatMessage: string;
  displayImagePath: string;
}

export interface IChatList {
  id: string;
  userId: number;
  roomId: number;
  messages: IChatContent[];
}

export interface IChatContent {
  senderId: number;
  senderNickname: string;
  message: string;
  time: string;
}
