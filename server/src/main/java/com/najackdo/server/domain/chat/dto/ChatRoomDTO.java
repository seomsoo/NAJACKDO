package com.najackdo.server.domain.chat.dto;

import com.najackdo.server.domain.chat.entity.ChatRoom;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO {

	private Long roomId; // 채팅방 아이디
	private Long customerId;
	private Long ownerId;

	public static ChatRoomDTO of(ChatRoom chatRoom) {
		ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
		chatRoomDTO.roomId = chatRoom.getRoomId();
		chatRoomDTO.customerId = chatRoom.getCustomer().getId();
		chatRoomDTO.ownerId = chatRoom.getOwner().getId();
		return chatRoomDTO;
	}
}