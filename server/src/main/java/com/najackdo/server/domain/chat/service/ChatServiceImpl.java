package com.najackdo.server.domain.chat.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartRepository;
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
	private final ChatMongoRepository chatRepository;
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final ChatMongoRepository chatMongoRepository;

	@Override
	public List<ChatRoomDTO> chatRoomList(User user) {

		List<ChatRoomDTO> result = new LinkedList<>();

		chatRoomRepository.findChatRoomsByUser(user)
			.forEach(chatRoom -> {


				List<Chat.Message> messages = chatMongoRepository.findByRoomId(chatRoom.getRoomId()).getMessages();
				Chat.Message message = messages.get(messages.size() - 1);
				


				result.add(
					ChatRoomDTO.search(chatRoom,
					message.getTime(),
					message.getMessage()
					)
				);

			});
		return result;

	}

	@Override
	@Transactional
	public ChatRoomDTO createRoom(User customer, Long ownerId, Long cartId) {

		User owner = userRepository.findById(ownerId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_CART));

		ChatRoom chatRoom = chatRoomRepository.save(
			ChatRoom.createChatRoom(customer, owner, cart)
		);

		log.info("test: {}",
			chatRoom.getOwner().getActivityAreaSetting().getLocation().getLocationName());

		Chat chat = new Chat();
		chat.setRoomId(chatRoom.getRoomId());
		chatMongoRepository.save(chat);

		System.out.println("===========================================================");

		System.out.println(chatRoom.getOwner().getActivityAreaSetting().getLocation().getLocationName());

		System.out.println("===========================================================");

		return ChatRoomDTO.create(chatRoom);
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