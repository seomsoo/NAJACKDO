package com.najackdo.server.domain.chat.dto;

import com.najackdo.server.domain.chat.entity.ChatRoom;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO {

	private String roomId; // 채팅방 아이디
	private Long customerId;
	private Long ownerId;

	public ChatRoomDTO(ChatRoom chatRoom) {
		this.roomId = chatRoom.getRoomId();
		this.customerId = chatRoom.getCustomer().getId();
		this.ownerId = chatRoom.getOwner().getId();
	}
}