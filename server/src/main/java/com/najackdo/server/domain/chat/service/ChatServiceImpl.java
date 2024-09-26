package com.najackdo.server.domain.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.chat.dto.ChatDTO;
import com.najackdo.server.domain.chat.dto.ChatRoomDTO;
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
public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepository chatRoomRepository;
	// private final RootConfig rootConfig;
	private final ChatMongoRepository chatRepository;
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final ChatMongoRepository chatMongoRepository;

	@Override
	public List<ChatRoomDTO> chatRoomList(User user) {
		return chatRoomRepository.findChatRoomsByUser(user)
			.stream().map(ChatRoomDTO::of).toList();
	}

	@Override
	@Transactional
	public ChatRoomDTO createRoom(User customer, Long ownerId, Long cartId) {

		User owner = userRepository.findById(ownerId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_CART));

		ChatRoom save = ChatRoom.createChatRoom(customer, owner, cart);
		ChatRoom chatRoom = chatRoomRepository.save(save);

		Chat chat = new Chat();
		chat.setRoomId(chatRoom.getRoomId());
		log.info("chatRoom.getRoomId() : {}", chatRoom.getRoomId());
		log.info("chat : {}", chat);

		chatMongoRepository.save(chat);

		return ChatRoomDTO.of(
			chatRoom
		);

		// return rootConfig.getMapper().map(chatRoom, ChatRoomDTO.class);

	}

	@Override
	public List<Chat.Message> getChatList(Long roomId, User user) {
		// chatRoomRepository.findById(roomId)
		// 	.orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

		// List<User> usersByRoomId = chatRoomRepository.findUsersByRoomId(roomId);
		// if (!usersByRoomId.contains(user)) {
		// 	throw new IllegalArgumentException("사용자가 채팅방에 존재하지 않습니다.");
		// }


		return chatRepository.findByRoomId(roomId).getMessages();

	}
}