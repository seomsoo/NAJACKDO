package com.najackdo.server.domain.chat.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.entity.CartItem;
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

	public ChatRoomData.Search chatRoomList(User user) {
		List<ChatRoomData.Search.SearchElement> result = new ArrayList<>();

		chatRoomRepository.findChatRoomsByUser(user).forEach(chatRoom -> {

			List<Chat.Message> messages = chatMongoRepository.findByRoomId(chatRoom.getRoomId()).getMessages();

			if (messages == null || messages.isEmpty()) {
				result.add(ChatRoomData.Search.SearchElement.search(chatRoom, null, "", null));
			} else {
				// 가장 최근 메시지 가져오기
				Chat.Message lastMessage = messages.get(messages.size() - 1);
				result.add(
					ChatRoomData.Search.SearchElement.search(chatRoom,
						lastMessage.getTime(),
						lastMessage.getMessage(),
						lastMessage.getTalkType()
					)
				);
			}
		});

		result.sort(Comparator.comparing(
			ChatRoomData.Search.SearchElement::getLastChatTime,
			Comparator.nullsFirst(Comparator.reverseOrder()))  // null 값을 우선 배치하고, 최근 시간이 먼저 오도록 내림차순 정렬
		);

		return ChatRoomData.Search.create(user.getId(), result);
	}

	@Transactional
	public Long createRoom(User customer, Long ownerId, Long cartId) {

		User owner = userRepository.findById(ownerId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_CART));
		cart.deleteCart();
		cartRepository.save(cart);

		ChatRoom chatRoom = chatRoomRepository.save(
			ChatRoom.create(customer, owner, cart)
		);

		Chat chat = new Chat();
		chat.setRoomId(chatRoom.getRoomId());
		chatMongoRepository.save(chat);

		return chatRoom.getRoomId();
	}

	public Chat getChatList(Long roomId, User user) {
		Chat chat = chatRepository.findByRoomId(roomId);
		chat.setUserId(user.getId());
		return chat;
	}
}