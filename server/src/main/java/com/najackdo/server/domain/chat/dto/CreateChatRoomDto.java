package com.najackdo.server.domain.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateChatRoomDto {

	private Long ownerId;
	private Long cartId;

}
