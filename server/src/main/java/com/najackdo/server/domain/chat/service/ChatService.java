package com.najackdo.server.domain.chat.service;

import java.util.List;

import com.najackdo.server.domain.chat.dto.ChatRoomDTO;
import com.najackdo.server.domain.chat.entity.Chat;
import com.najackdo.server.domain.user.entity.User;

public interface ChatService {
	List<ChatRoomDTO> chatRoomList(User user);

	ChatRoomDTO createRoom(User customerId, Long owner, Long cartId);

	List<Chat.Message> getChatList(Long roomId, User user);
}
