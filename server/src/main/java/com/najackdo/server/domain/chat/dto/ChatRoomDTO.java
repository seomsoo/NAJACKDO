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
	private String roomName; // 채팅방 이름

	public ChatRoomDTO(ChatRoom chatRoom) {
		this.roomId = chatRoom.getRoomId();
		this.roomName = chatRoom.getRoomName();
	}
}