package com.najackdo.server.domain.chat.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.chat.dto.ChatRoomData;
import com.najackdo.server.domain.chat.entity.Chat;
import com.najackdo.server.domain.chat.entity.ChatRoom;
import com.najackdo.server.domain.chat.repository.ChatMongoRepository;
import com.najackdo.server.domain.chat.repository.ChatRoomRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatRoomRepository chatRoomRepository;
	private final ChatMongoRepository chatRepository;
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final ChatMongoRepository chatMongoRepository;

	public ChatRoomData.ChatRoomWithUserDTO chatRoomList(User user) {

		List<ChatRoomData.ChatRoomDTO> result = new LinkedList<>();

		chatRoomRepository.findChatRoomsByUser(user)
			.forEach(chatRoom -> {



				List<Chat.Message> messages = chatMongoRepository.findByRoomId(chatRoom.getRoomId()).getMessages();
				Chat.Message message = messages.get(messages.size() - 1);

				result.add(
					ChatRoomData.ChatRoomDTO.search(chatRoom,
					message.getTime(),
					message.getMessage()
					)
				);

			});
		return ChatRoomData.ChatRoomWithUserDTO.create(user.getId(), result);


	}

	@Transactional
	public ChatRoomData.ChatRoomDTO createRoom(User customer, Long ownerId, Long cartId) {

		User owner = userRepository.findById(ownerId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_CART));

		ChatRoom chatRoom = chatRoomRepository.save(
			ChatRoom.createChatRoom(customer, owner, cart)
		);

		Chat chat = new Chat();
		chat.setRoomId(chatRoom.getRoomId());
		chatMongoRepository.save(chat);

		return ChatRoomData.ChatRoomDTO.create(chatRoom);
		// return rootConfig.getMapper().map(chatRoom, ChatRoomDTO.class);

	}

	public Chat getChatList(Long roomId, User user) {
		// chatRoomRepository.findById(roomId)
		// 	.orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

		// List<User> usersByRoomId = chatRoomRepository.findUsersByRoomId(roomId);
		// if (!usersByRoomId.contains(user)) {
		// 	throw new IllegalArgumentException("사용자가 채팅방에 존재하지 않습니다.");
		// }
		Chat chat = chatRepository.findByRoomId(roomId);
		chat.setUserId(user.getId());

		return chat;

	}
}